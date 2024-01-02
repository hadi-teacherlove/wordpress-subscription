<?php

namespace Wordpress_Subscription\Inc\Active_Subscriptions;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

use Wordpress_Subscription\Inc\Post_Types\Active_Subscriptions_Post_Type;

class Active_Subscriptions {
	public function __construct() {
		add_shortcode( 'wordpress-subscription-users-active-subscriptions', [ $this, 'user_active_subscriptions' ] );
	}

	public function user_active_subscriptions( $attributes ) {
		$attributes = shortcode_atts(
			[
				'user_id' => get_current_user_id(),
			],
			$attributes
		);

		$subscriptions = get_posts(
			[
				'post_type'      => Active_Subscriptions_Post_Type::POST_TYPE,
				'posts_per_page' => -1,
				'post_status'    => 'any',
				'meta_query'     => [
					[
						'key'     => 'user_id',
						'value'   => $attributes['user_id'],
						'compare' => '=',
					],
				],
			]
		);

		$subscriptions_data = [];
		foreach ( $subscriptions as $subscription ) {
			$subscriptions_data[] = [
				'id'     => $subscription->ID,
				'title'  => $subscription->post_title,
				'status' => $subscription->post_status,
			];
		}

		return $subscriptions_data;
	}
}

new Active_Subscriptions();
