<?php

namespace Wordpress_Subscription\Inc\Subscriptions;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

use Wordpress_Subscription\Inc\Post_Types\Subscriptions_Post_Type;

class Subscriptions {
	public function __construct() {
		add_action( 'woocommerce_order_status_completed', [ $this, 'check_to_active_subscription' ] );
	}

	public function check_to_active_subscription( $order_id ) {
		// We check if the order has a product that trigger a subscription, Then we active subscription for the user.
	}
}

new Subscriptions();
