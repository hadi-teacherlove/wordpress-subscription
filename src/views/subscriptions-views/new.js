import React from 'react';
import * as options from '@wpSubscription';
import { __ } from '@wordpress/i18n';
import { useForm } from 'react-hook-form';

export default () => {
    const { register, handleSubmit } = useForm();

    const submitForm = ( inputs ) => {
        wp.ajax.post( {
            'action': 'cloud_portal_buy_button',
            'sub_action': 'create_new_subscription',
            'data': inputs,
            'nonce': options.nonce,
        } )
            .done( ( response ) => {
                // replace all {br} with <br>
                response = response.replace( /{br}/g, '<br>' );
                document.getElementById( 'cloud-portal-buy-button-result' ).innerHTML = response;
            } )
            .fail( ( response ) => {
                document.getElementById( 'cloud-portal-buy-button-result' ).innerHTML = response;
            } );
    };

    
    return (
        <>
            <form  onSubmit={ handleSubmit( ( inputs ) => submitForm( inputs ) ) }>

            </form>
        </>
    );
};