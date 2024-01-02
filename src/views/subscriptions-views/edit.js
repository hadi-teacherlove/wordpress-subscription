import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { Button } from 'react-bootstrap';
import * as options from '@wpSubscription';
import { set } from 'react-hook-form';

export default () => {
	const { id } = useParams();
	const [ subscription, setSubscription ] = useState( [] );

	useEffect( () => {
		getSubscription();
	}, [ id ] );

	const getSubscription = () => {
		wp.ajax.post( {
			'action': 'wordpress_subscription_ajax_handler',
			'sub_action': 'get_subscription',
			'id': id,
			'nonce': options.nonce,
		} )
			.done( ( response ) => {
				setSubscription( response ); 
			} )
			.fail( ( response ) => {
				console.log( response );
			} );
	};

	const removeSubscription = () => {
		wp.ajax.post( {
			'action': 'wordpress_subscription_ajax_handler',
			'sub_action': 'remove_subscription',
			'id': id,
			'nonce': options.nonce,
		} )
			.done( () => {
				window.location.hash = '#/';
			} )
			.fail( ( response ) => {
				console.log( response );
			} );
	};

	const publishSubscription = () => {
		wp.ajax.post( {
			'action': 'wordpress_subscription_ajax_handler',
			'sub_action': 'publish_subscription',
			'id': id,
			'nonce': options.nonce,
		} )
			.done( ( response ) => {
				setSubscription( response );
			} )
			.fail( ( response ) => {
				console.log( response );
			} );
	};

	const deactivateSubscription = () => {
		wp.ajax.post( {
			'action': 'wordpress_subscription_ajax_handler',
			'sub_action': 'deactivate_subscription',
			'id': id,
			'nonce': options.nonce,
		} )
			.done( ( response ) => {
				setSubscription( response );
			} )
			.fail( ( response ) => {
				console.log( response );
			} );
	};

	return (
		<>
			<div className="edit-page-header">
				<div className="edit-page-header-left">
					<h5>{ subscription.post_title }</h5>
				</div>
				<div className="edit-page-header-right">
					{
						'draft' === subscription.post_status && (
							<Button
								variant="success"
								onClick={ publishSubscription }
							>
								{ __( 'Activate', 'wordpress-subscription' ) }
							</Button>
						)
					}
					{
						'publish' === subscription.post_status && (
							<Button
								variant="warning"
								onClick={ deactivateSubscription }
							>
								{ __( 'Deactivate', 'wordpress-subscription' ) }
							</Button>
						)
					}
					
					<Button
						variant="danger"
						onClick={ removeSubscription }
					>
						{ __( 'Remove', 'wordpress-subscription' ) }
					</Button>
				</div>
			</div>
			<div className="edit-page-content">
				<div className="edit-page-content-item-status">
					<h6>{ __( 'Status', 'wordpress-subscription' ) }</h6>
					<p>{ __( 'draft' === subscription.post_status ? 'Deactivated' : 'Activated', 'wordpress-subscription' ) }</p>
				</div>
				<div className="edit-page-content-item-options">

				</div>
			</div>
		</>
	);
};
