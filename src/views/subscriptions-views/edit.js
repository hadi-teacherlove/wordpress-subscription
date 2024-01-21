import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as options from '@wpSubscription';

export default () => {
	const { id } = useParams();
	const [ subscription, setSubscription ] = useState( [] );
	const [ trigger, setTrigger ] = useState( 'purchase-woo-product' );
	const { register, handleSubmit, setValue } = useForm();

	useEffect( () => {
		getSubscription();
	}, [ id ] );

	const onSubmit = ( fields ) => {
		wp.ajax.post( {
			action: 'wordpress_subscription_ajax_handler',
			sub_action: 'save_subscription',
			post_id: id,
			fields: fields,
			nonce: options.nonce,
		} )
			.done( () => {
				
			} )
			.fail( () => {
				// eslint-disable-next-line no-console
				console.error( 'Error' );
			} );
	};

	const getSubscription = () => {
		wp.ajax.post( {
			'action': 'wordpress_subscription_ajax_handler',
			'sub_action': 'get_subscription',
			'id': id,
			'nonce': options.nonce,
		} )
			.done( ( response ) => {
				setSubscription( response );
				setTrigger( response.data.subscription_trigger );
				setValue( 'subscription_period', response.data.subscription_period );
				setValue( 'subscription_trigger', response.data.subscription_trigger );
				setValue( 'subscription_woo_product_id', response.data.subscription_woo_product_id );
				setValue( 'subscription_reminder_period', response.data.subscription_reminder_period );
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
				<form onSubmit={ handleSubmit( onSubmit ) }>
					<div className="edit-page-content-item-options">
						<div className="subscription-period form-group">
							<label htmlFor="subscription-period" className="field-title">{ __( 'Subscription Period', 'wordpress-subscription' ) }</label>
							<Form.Control
								as="select"
								className="form-control"
								id="subscription-period"
								{ ...register( 'subscription_period' ) }
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
							</Form.Control>
						</div>
						<div className="subscription-trigger form-group">
							<label htmlFor="subscription-trigger" className="field-title">{ __( 'Subscription Trigger', 'wordpress-subscription' ) }</label>
							<Form.Control
								as="select"
								className="form-control"
								id="subscription-trigger"
								{ ...register( 'subscription_trigger' ) }
								onChange={ ( event ) => {
									setTrigger( event.target.value );
								} }
							>
								<option value="">{ __( 'Select a trigger', 'wordpress-subscription' ) }</option>
								<option value="purchase-woo-product">{ __( 'Purchase a WooCommerce product', 'wordpress-subscription' ) }</option>
							</Form.Control>
						</div>
						{
							'purchase-woo-product' === trigger && (
								<div className="subscription-woo-product-id form-group">
									<label htmlFor="subscription-woo-product-id" className="field-title">{ __( 'WooCommerce Product ID', 'wordpress-subscription' ) }</label>
									<input
										type="number"
										className="form-control"
										id="subscription-woo-product-id"
										{ ...register( 'subscription_woo_product_id' ) }
									/>
									<label className="form-description">
										{ __( 'The subscription will be activated when the user purchases this product.', 'wordpress-subscription' ) }
									</label>
								</div>
							)
						}
						<div className="subscription-reminder-email form-group">
							<label htmlFor="subscription-reminder-email" className="field-title">{ __( 'Reminder Email', 'wordpress-subscription' ) }</label>
							<select
								className="form-control"
								id="subscription-period"
								{ ...register( 'subscription_reminder_period' ) }
								multiple={ true }
							>
								<option value="1-week">{ __( '1 week before ending', 'wordpress-subscription' ) }</option>
								<option value="3-days">{ __( '3 days before ending', 'wordpress-subscription' ) }</option>
								<option value="1-day">{ __( '1 day before ending', 'wordpress-subscription' ) }</option>
							</select>
							<label className="form-description">
								{ __( 'Set the time to send a reminder email that let the user knows about the subscription renewal.', 'wordpress-subscription' ) }
							</label>
						</div>
					</div>
					<div className="save-btn-holder mt-4">
						<Button variant="primary" type="submit">
							{ __( 'Save', 'wordpress-subscription' ) }
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};
