<?php

namespace Wordpress_Subscription\Inc\Post_Types;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class Subscriptions_Post_Type {
    public function __construct() {
        add_action( 'init', [ $this, 'register_post_type' ] );
    }

    public function register_post_type() {
        $labels = [
			'name'                  => _x( 'subscriptions', 'Post type general name', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'singular_name'         => _x( 'subscription', 'Post type singular name', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'menu_name'             => _x( 'subscriptions', 'Admin Menu text', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'name_admin_bar'        => _x( 'subscription', 'Add New on Toolbar', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'add_new'               => esc_html__( 'Add New', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'add_new_item'          => esc_html__( 'Add New subscription', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'new_item'              => esc_html__( 'New subscription', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'edit_item'             => esc_html__( 'Edit subscription', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'view_item'             => esc_html__( 'View subscription', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'all_items'             => esc_html__( 'All subscriptions', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
		];

		$args = [
			'labels'              => $labels,
			'description'         => esc_html__( 'Description.', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'exclude_from_search' => true,
			'show_in_rest'        => false,
			'public'              => true,
			'publicly_queryable'  => false,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'query_var'           => true,
			'rewrite'             => [ 'slug' => 'wp-subscriptions' ],
			'capability_type'     => 'post',
			'has_archive'         => true,
			'hierarchical'        => false,
			'menu_position'       => null,
			'menu_icon'           => 'dashicons-admin-network',
			'supports'            => [ 'title', 'custom-fields' ],
		];

		register_post_type( 'wp-subscriptions', $args );
    }
};

new Subscriptions_Post_Type();
