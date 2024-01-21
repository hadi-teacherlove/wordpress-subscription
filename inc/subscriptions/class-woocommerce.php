<?php

namespace Wordpress_Subscription\Inc\Subscriptions;

defined ( 'ABSPATH' ) || exit;

use Wordpress_Subscription\Inc\Subscriptions\Ajax_Handler;
use Wordpress_Subscription\Inc\Subscriptions\Subscriptions;
use Wordpress_Subscription\Inc\Post_Types\Active_Subscriptions_Post_Type;

class WooCommerce {
	CONST PRODUCTS_WITH_TRIGGER = 'wordpress-subscription-woo-products-with-trigger';

	public function __construct() {
		add_action( 'woocommerce_order_status_completed', [ $this, 'order_completed' ] );
	}

	public function order_completed( $order_id ) {
		$order = wc_get_order( $order_id );

		if ( ! $order ) {
			return;
		}

		$user_id = $order->get_user_id();

		if ( ! $user_id ) {
			return;
		}

		$order_items = $order->get_items();
		$product_ids = [];

		if ( empty( $order_items ) ) {
			return;
		}

		foreach ( $order_items as $item_id => $item ) {
			$product_ids[] = $item->get_product_id();
		}

		$trigger_products = get_option( self::PRODUCTS_WITH_TRIGGER, [] );

		if ( empty( $trigger_products ) ) {
			return;
		}

		foreach ( $trigger_products as $trigger_product => $plan_id ) {
			if ( in_array( $trigger_product, $product_ids, true ) ) {
				$this->activate_plan_for_user( $plan_id, $user_id );
			}
		}
	}

	public function activate_plan_for_user( $plan_id, $user_id ) {
		$status = get_post_status( $plan_id );

		if ( 'publish' !== $status ) {
			return false;
		}

		$created             = time();
		$subscription_data   = get_post_meta( $plan_id, Ajax_Handler::SUBSCRIPTION_DATA, true );
		$subscription_period = $subscription_data['subscription_period'];
		$period              = Subscriptions::calculate_subscription_duration_by_seconds( $subscription_period );
		$expire              = $created + $period;
		$plan_title          = get_the_title( $plan_id );
		$post_title          = md5( $plan_title . $user_id . $created );

		$post_id = wp_insert_post(
			[
				'post_title'  => $post_title,
				'post_type'   => Active_Subscriptions_Post_Type::POST_TYPE,
				'post_status' => 'publish',
				'meta_input'  => [
					'plan'    => $plan_title,
					'plan_id' => $plan_id,
					'user_id' => $user_id,
					'created' => $created,
					'expire'  => $expire,
				],
			]
		);

		if ( is_wp_error( $post_id ) ) {
			$admin_email = get_option('admin_email');

			wp_mail( 
				$admin_email, 
				'Error while activating a plan', 
				'We could not activate ' . $plan_title . ' for user ' . $user_id . '. Error: ' . $post_id->get_error_message() 
			);

			return false;
		}

		return true;
	}
}

new WooCommerce();