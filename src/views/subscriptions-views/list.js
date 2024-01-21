import React, { useState, useEffect } from 'react';
import * as options from '@wpSubscription';
import { __ } from '@wordpress/i18n';
import { Card } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

export default () => {
    const [ subscriptions, setSubscriptions ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    useEffect( () => {
        wp.ajax.post( {
            'action': 'wordpress_subscription_ajax_handler',
            'sub_action': 'get_subscriptions',
            'nonce': options.nonce,
        } )
            .done( ( response ) => {
                setSubscriptions( response );
                setLoading( false );
            } )
            .fail( ( response ) => {
                console.log( response );
            } );
    }, [] );

    return (
        <>
            { loading ? (
                <div className="spinner-border text-primary mx-auto d-block" role="status">
                    <span className="sr-only"></span>
                </div>
            ) : (
                <div className="subscriptions-list-cards">
                    { subscriptions.map( ( subscription ) => (
                        <Card key={ subscription.id } className="p-0">
                            <Card.Header className="p-0">
                                <Card.Img variant="top" src={ options.urls.files + 'placeholder.png' } />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <NavLink to={ '/edit/' + subscription.id }>
                                        { subscription.title }
                                    </NavLink>
                                </Card.Title>
                                <Card.Text>
                                    <span className="text-center d-block">
                                    {
                                        'draft' === subscription.status ? 'Deactivated' : 'Activated'
                                    }
                                    </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ) ) }
                </div>
            ) }
        </>
    )
};
