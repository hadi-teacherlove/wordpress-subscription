<?php

namespace Wordpress_Subscription\Inc\Subscriptions;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

use Wordpress_Subscription\Inc\Post_Types\Subscriptions_Post_Type;

class Subscriptions {
	public static function calculate_subscription_duration_by_seconds( $period ) {
		$day = 86400;

		switch ( $period ) {
			case 'daily':
				return $day;
			case 'weekly':
				return $day * 7;
			case 'monthly':
				return $day * 30;
			case 'quarterly':
				return $day * 30 * 3;
			case 'half-yearly':
				return $day * 30 * 6;
			case 'yearly':
				return $day * 365;
			case '2-years':
				return $day * 365 * 2;
			case '3-years':
				return $day * 365 * 3;
		}
	}
}

new Subscriptions();
