import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Billing() {
  const { user } = useAuth();

  useEffect(() => {
    // Load Stripe.js script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="billing-container">
      <h2>Subscription Plans</h2>
      {user?.subscriptionStatus === 'active' ? (
        <div className="subscription-active">
          <h3>You are currently subscribed</h3>
          <p>Your subscription is active and you have access to all features.</p>
        </div>
      ) : (
        <stripe-pricing-table
          pricing-table-id="prctbl_1QsHjeIKiglM6DRSk7kxhe9t"
          publishable-key="pk_live_51QMOjJIKiglM6DRS9ATAYCaikVOHqrgS5rp41J0C6od7C65ooO25g0c4lpxtmR0KHVzsApS9InIgceMkPjI5E37k00jQKaXRCD"
        />
      )}
    </div>
  );
}

export default Billing; 