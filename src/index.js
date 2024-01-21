import React from 'react';
import { createRoot } from 'react-dom/client';
import Subscription from './views/subscriptions';
import ActiveSubscription from './views/active-subscriptions';
import './style.scss';

window.addEventListener( 'load', () => {
	const subscriptions = document.getElementById( 'wordpress-subscription-container' );
	if ( subscriptions ) {
		const root = createRoot( subscriptions );
		root.render( <Subscription /> );
	}

    const activeSubscriptions = document.getElementById( 'wordpress-subscription-active-plans' );
    if ( activeSubscriptions ) {
		const root = createRoot( activeSubscriptions );
		root.render( <ActiveSubscription /> );
	}
} );
