<?php

namespace Wordpress_Subscription\Inc\Post_Types;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class Active_Subscriptions_Post_Type {
	const POST_TYPE = 'wp-active-subs';

    public function __construct() {
        add_action( 'init', [ $this, 'register_post_type' ] );
    }

    public function register_post_type() {
        $labels = [
			'name'                  => _x( 'Active subscriptions', 'Post type general name', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'singular_name'         => _x( 'subscription', 'Post type singular name', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'menu_name'             => _x( 'Active subscriptions', 'Admin Menu text', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
			'name_admin_bar'        => _x( 'subscription', 'Add New on Toolbar', WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN ),
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
			'rewrite'             => [ 'slug' => self::POST_TYPE ],
			'capability_type'     => 'post',
			'has_archive'         => true,
			'hierarchical'        => false,
			'menu_position'       => null,
			'menu_icon'           => 'dashicons-admin-network',
			'supports'            => [ 'title', 'custom-fields' ],
		];

		register_post_type( self::POST_TYPE, $args );
    }
};

new Active_Subscriptions_Post_Type();
