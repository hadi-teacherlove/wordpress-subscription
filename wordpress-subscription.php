<?php
/**
 * Plugin Name: WordPress Subscription
 * Plugin URI: 
 * Description: A plugin to create a subscription for WordPress
 * Version: 1.0
 * Author: Hadi Mohammadi
 * Author URI:
 * License: GPLv2 or later
 * Text Domain: wordpress-subscription
 */

// Exit if accessed directly
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class Cloud_Portal_Wordpress_Subscription {
	public function __construct() {
		$this->constants();
		require_once plugin_dir_path( __FILE__ ) . 'inc/init.php';
	}

	private function constants() {
		define( 'WORDPRESS_SUBSCRIPTION_VERSION', '1.0' );
		define( 'WORDPRESS_SUBSCRIPTION_DIR', plugin_dir_path( __FILE__ ) );
		define( 'WORDPRESS_SUBSCRIPTION_URL', plugin_dir_url( __FILE__ ) );
		define( 'WORDPRESS_SUBSCRIPTION_FILE', __FILE__ );
		define( 'WORDPRESS_SUBSCRIPTION_BASENAME', plugin_basename( __FILE__ ) );
		define( 'WORDPRESS_SUBSCRIPTION_TEXT_DOMAIN', 'wordpress-subscription' );
		define( 'WORDPRESS_SUBSCRIPTION_ASSETS', WORDPRESS_SUBSCRIPTION_URL . 'assets/' );
	}
}

new Cloud_Portal_Wordpress_Subscription();
