import React, { useState } from 'react';
import * as options from '@wpSubscription';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';

export default () => {
    const { register, handleSubmit } = useForm();
    const [ errorMsg, setErrorMsg ] = useState( '' );

    const submitForm = ( inputs ) => {
        setErrorMsg( '' );

        wp.ajax.post( {
            'action': 'wordpress_subscription_ajax_handler',
            'sub_action': 'create_new_subscription',
            'data': inputs,
            'nonce': options.nonce,
        } )
            .done( ( response ) => {
                window.location.hash = '#/edit/' + response.id;
            } )
            .fail( ( response ) => {
                setErrorMsg( response );
            } );
    };

    
    return (
        <>
            <form  onSubmit={ handleSubmit( ( inputs ) => submitForm( inputs ) ) }>
                <Form.Group controlId="subscription-title">
                    <Form.Label>{ __( 'Subscription Name', 'wordpress-subscription' ) }</Form.Label>
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        { ...register( 'title', { required: true } ) }
                    />
                </Form.Group>

                <div className="mt-3">
                    <Button
                        type="submit"
                        variant="btn btn-primary btn-md"
                        className="wp-block-button__link"
                    >
                        { __( 'Create', 'wordpress-subscription' ) }
                    </Button>
                </div>
            </form>
            <div className="mt-3 text-warning">
                { errorMsg }
            </div>
        </>
    );
};
