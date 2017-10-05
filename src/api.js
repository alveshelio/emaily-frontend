import axios from 'axios';

axios.defaults.headers.common[ 'Authorization' ] = localStorage.getItem('bookwormJWT') || '';

// TODO Fix issue with invalid credentials.

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post('/api/users', { user }).then(res => res.data.user),
    confirm: token =>
      axios.post('/api/auth/confirmation', { token }).then(res => res.data),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset_password_request', { email }),
    validateToken: token => axios.post('/api/auth/validate_token', { token }),
    resetPassword: data => axios.post('/api/auth/reset_password', { data }),
  },
  billing: {
    handlePayment: (token, amount, JWTToken) =>
      axios.post('/api/billing/add_credits', { token, amount, JWTToken }).then(res => res.data),
    getCreditsFromUser: JWTToken =>
      axios.post('/api/billing/fetch_credits', { JWTToken })
        .then(res => res.data.credits),
  },
  surveys: {
    createSurvey: survey =>
      axios.post('/api/survey/new', { survey })
        .then(res => res.data.survey),

    getSurveysBelongToUser: (userId, nPerPage, pageNumber) =>
      axios.get(`/api/users/${userId}/surveys?nPerPage=${nPerPage}&pageNumber=${pageNumber}`)
        .then(res => res.data),

    sendSurvey: surveyId => axios.post(`/api/survey/send/${surveyId}`)
        .then(res => res.data),

    fetchSurvey: surveyId => axios.get(`/api/survey/${surveyId}`)
      .then(res => res.data.survey),
  }
};

