<?php

namespace Wordpress_Subscription\Inc\Subscriptions;

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

class Ajax_Handler {
    public function __construct() {
        add_action( 'wp_ajax_wordpress_subscription', [ $this, 'ajax_handler' ] );
    }

    public function ajax_handler() {
        check_ajax_referer( 'wordpress-subscription', 'nonce' );
        $action = filter_input( INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
        
        if ( method_exists( $this, $action ) ) {
            $this->$action();
        } else {
            wp_send_json_error( ['error'=> ''] );
        }
    }
}
