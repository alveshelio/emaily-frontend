import { FETCH_CREDITS, UPDATE_CREDITS } from '../constants/types';
import api from '../api';

export const updateCredits = credits => ({
  type: UPDATE_CREDITS,
  credits
});

export const fetchCredits = credits => ({
  type: FETCH_CREDITS,
  credits
});

export const addCredits = (token, amount, JWTToken) => dispatch => api.billing.handlePayment(token, amount, JWTToken)
  .then(result => dispatch(updateCredits(result.credits)));

export const getCreditsValue = JWTToken => dispatch =>
  api.billing.getCreditsFromUser(JWTToken)
    .then((result) => dispatch(fetchCredits(result)));