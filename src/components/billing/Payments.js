import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { Button } from 'semantic-ui-react';

import { addCredits } from '../../actions/billing';

const Payments = ({ amount, disabled, addCredits, JWTToken }) => {
  return (
    <StripeCheckout
      amount={ amount }
      token={ token => addCredits(token, amount, JWTToken)}
      name='Emaily'
      description='Getting feedback from your users has never been easier.'
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <Button primary color='teal' disabled={disabled}>Pay via Stripe</Button>
    </StripeCheckout>
  );
};

Payments.propTypes = {
  amount: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  addCredits: PropTypes.func.isRequired,
  JWTToken: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  JWTToken: state.user.token
});

export default connect(mapStateToProps, { addCredits })(Payments);
