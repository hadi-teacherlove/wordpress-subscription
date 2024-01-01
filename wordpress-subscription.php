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
		require_once plugin_dir_path( __FILE__ ) . 'inc/init.php';
	}
}

new Cloud_Portal_Wordpress_Subscription();
