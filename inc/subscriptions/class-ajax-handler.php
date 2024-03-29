<?php

namespace Wordpress_Subscription\Inc\Subscriptions;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

use Wordpress_Subscription\Inc\Post_Types\Subscriptions_Post_Type;
use Wordpress_Subscription\Inc\Subscriptions\WooCommerce;

class Ajax_Handler {
	const SUBSCRIPTION_DATA = 'wordpress-subscription-data';

	public function __construct() {
		add_action( 'wp_ajax_wordpress_subscription_ajax_handler', [ $this, 'ajax_handler' ] );
	}

	public function ajax_handler() {
		check_ajax_referer( 'wordpress-subscription', 'nonce' );
		$action = filter_input( INPUT_POST, 'sub_action', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		
		if ( method_exists( $this, $action ) ) {
			call_user_func( [ $this, $action ] );
		} else {
			wp_send_json_error( ['error'=> ''] );
		}
	}

	private function create_new_subscription() {
		$data = filter_input( INPUT_POST, 'data', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		$post = wp_insert_post(
			[
				'post_title' => $data['title'],
				'post_type'  => Subscriptions_Post_Type::POST_TYPE,
				'post_status'=> 'draft',
			]
		);

		if ( is_wp_error( $post ) ) {
			wp_send_json_error( $post->get_error_message() );
		}

		wp_send_json_success( [
			'id' => $post,
		] );
	}

	private function get_subscriptions() {
		$subscriptions = get_posts(
			[
				'post_type'      => Subscriptions_Post_Type::POST_TYPE,
				'posts_per_page' => -1,
				'post_status'    => 'any',
			]
		);

		$subscriptions_data = [];
		foreach ( $subscriptions as $subscription ) {
			$subscriptions_data[] = [
				'id'     => $subscription->ID,
				'title'  => $subscription->post_title,
				'status' => $subscription->post_status,
			];
		}

		wp_send_json_success( $subscriptions_data );
	}

	private function remove_subscription() {
		$id = filter_input( INPUT_POST,'id', FILTER_SANITIZE_NUMBER_INT );

		wp_delete_post( $id, true );
		wp_send_json_success();
	}

	private function get_subscription() {
		$id = filter_input( INPUT_POST,'id', FILTER_SANITIZE_NUMBER_INT );

		$subscription       = get_post( $id );
		$subscription->data = get_post_meta( $id, self::SUBSCRIPTION_DATA, true );

		wp_send_json_success( $subscription );
	}

	private function publish_subscription() {
		$id   = filter_input( INPUT_POST,'id', FILTER_SANITIZE_NUMBER_INT );
		$post = wp_update_post( [
			'ID'          => $id,
			'post_status' => 'publish',
		] );

		if ( is_wp_error( $post ) ) {
            wp_send_json_error( $post->get_error_message() );
        }

		$post = get_post( $post );

		wp_send_json_success( $post );
	}

	private function deactivate_subscription() {
		$id   = filter_input( INPUT_POST,'id', FILTER_SANITIZE_NUMBER_INT );
		$post = wp_update_post( [
			'ID'          => $id,
			'post_status' => 'draft',
		] );

		if ( is_wp_error( $post ) ) {
            wp_send_json_error( $post->get_error_message() );
        }

		$post = get_post( $post );

		wp_send_json_success( $post );
	}

	private function save_subscription() {
		$data = filter_input( INPUT_POST, 'fields', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY ); 
		$id   = filter_input( INPUT_POST, 'post_id', FILTER_SANITIZE_NUMBER_INT );

		if ( 'purchase-woo-product' === $data['subscription_trigger'] ) {
			$product_id          = $data['subscription_woo_product_id'];
			$products_by_trigger = get_option( WooCommerce::PRODUCTS_WITH_TRIGGER, [] );

			$products_by_trigger[ $product_id ] = $id; 

			update_option( WooCommerce::PRODUCTS_WITH_TRIGGER, $products_by_trigger );
		}

		update_post_meta( $id, self::SUBSCRIPTION_DATA, $data );

		wp_send_json_success();
	}
}

new Ajax_Handler();
