<?php

namespace Wordpress_Subscription\Inc;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class init {
    public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ], 200 );
	}

	public function add_admin_menu() {
		add_submenu_page(
			'sellkit-dashboard',
			esc_html__( 'Subscription', 'wordpress-subscription' ),
			esc_html__( 'Subscription', 'wordpress-subscription' ),
			'manage_options',
			'sellkit-subscription',
			[ $this, 'subscription_page' ],
			50
		);

		add_submenu_page(
			'sellkit-dashboard',
			esc_html__( 'Active Subscriptions', 'wordpress-subscription' ),
			esc_html__( 'Active Subscriptions', 'wordpress-subscription' ),
			'manage_options',
			'sellkit-active-subscription',
			[ $this, 'active_subscription_page' ],
			50
		);
	}

	public function subscription_page() {
		echo '<div class="wrap">';
		echo '<h1>' . __( 'Subscription', 'wordpress-subscription' ) . '</h1>';
		echo '</div>';
	}

	public function active_subscription_page() {
		echo '<div class="wrap">';
		echo '<h1>' . __( 'Active Subscriptions', 'wordpress-subscription' ) . '</h1>';
		echo '</div>';
	
	}
}

new init();
