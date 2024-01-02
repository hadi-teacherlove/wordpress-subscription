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
					<div className="subscription-period form-group">
						<label htmlFor="subscription-period" className="field-title">{ __( 'Subscription Period', 'wordpress-subscription' ) }</label>
						<select
							className="form-control"
							id="subscription-period"
						>
							<option value="">{ __( 'Select a period', 'wordpress-subscription' ) }</option>
						 	<option value="daily">{ __( '1 Day', 'wordpress-subscription' ) }</option>
							<option value="weekly">{ __( '1 Week', 'wordpress-subscription' ) }</option>
							<option value="monthly">{ __( '1 Month', 'wordpress-subscription' ) }</option>
							<option value="quarterly">{ __( '3 Months', 'wordpress-subscription' ) }</option>
							<option value="half-yearly">{ __( '6 Months', 'wordpress-subscription' ) }</option>
							<option value="yearly">{ __( '1 Year', 'wordpress-subscription' ) }</option>
							<option value="2-years">{ __( '2 Years', 'wordpress-subscription' ) }</option>
						 	<option value="3-years">{ __( '3 Years', 'wordpress-subscription' ) }</option>
						</select>
					</div>
					<div className="subscription-trigger form-group">
						<label htmlFor="subscription-trigger" className="field-title">{ __( 'Subscription Trigger', 'wordpress-subscription' ) }</label>
						<input type="text" className="form-control" id="subscription-trigger" readOnly value="Purchase a WooCommerce product" />
					</div>
					<div className="subscription-woo-product-id form-group">
						<label htmlFor="subscription-woo-product-id" className="field-title">{ __( 'WooCommerce Product ID', 'wordpress-subscription' ) }</label>
						<input type="number" className="form-control" id="subscription-woo-product-id" />
						<label className="form-description">
							{ __( 'The subscription will be activated when the user purchases this product.', 'wordpress-subscription' ) }
						</label>
					</div>
					<div className="subscription-reminder-email form-group">
						<label htmlFor="subscription-reminder-email" className="field-title">{ __( 'Reminder Email', 'wordpress-subscription' ) }</label>
						<select
							className="form-control"
							id="subscription-period"
						>
							<option value="">{ __( 'Select a period', 'wordpress-subscription' ) }</option>
						</select>
						<label className="form-description">
							{ __( 'Set the time to send A reminder email that let the user knows about the subscription renewal.', 'wordpress-subscription' ) }
						</label>
					</div>
				</div>
			</div>
		</>
	);
};
