<?php

namespace Wordpress_Subscription\Inc;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class init {
    public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ], 200 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_assets' ] );
	}

	public function admin_assets() {
		
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
		echo '<div class="wrap" id="wordpress-subscription-container"></div>';
	}

	public function active_subscription_page() {
		echo '<div class="wrap" id="wordpress-subscription-active-plans"></div>';
	}
}

new init();
