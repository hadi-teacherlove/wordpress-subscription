<?php

namespace Wordpress_Subscription\Inc;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class init {
    public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ], 200 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_assets' ] );

		$this->includes();
	}

	public function admin_assets() {
		wp_enqueue_script( 
			'wordpress-subscription-admin',
			WORDPRESS_SUBSCRIPTION_ASSETS . 'admin.js',
			[ 'jquery', 'wp-util', 'wp-api', 'wp-i18n', 'lodash' ],
			'1.0.0',
			true
		);

		wp_enqueue_style(
			'wordpress-subscription-admin',
			WORDPRESS_SUBSCRIPTION_ASSETS . 'admin.css',
			[],
			'1.0.0'
		);

		wp_localize_script(
			'wordpress-subscription-admin',
			'wordpressSubscription',
			[
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'wordpress-subscription' ),
			]
		);
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

	private function includes() {
		$files = [
			'inc/post-types/active-subscriptions-post-type',
			'inc/post-types/subscriptions-post-type',
			'inc/subscriptions/ajax-handler',
		];

		foreach ( $files as $file ) {
			require_once WORDPRESS_SUBSCRIPTION_DIR . $file . '.php';
		}
	}
}

new init();
