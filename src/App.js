import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import DashboardPage from './components/pages/DashboardPage';
import AddCreditsPage from './components/pages/AddCreditsPage';
import AddSurveyPage from './components/pages/AddSurveyPage';
import SurveysPage from './components/pages/SurveysPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

/*
* location is provided from ./index.js <Route /> component because instead
* of Rendering component <App />, we are passing it to <Route component={App} />
* in index.js
* */

const App = ({ location }) => (
  <div className='ui container'>
    <Route location={location} exact path='/' component={HomePage} />
    <GuestRoute location={location} path='/login' component={LoginPage} />
    <GuestRoute location={location} path='/signup' component={SignupPage} />
    <GuestRoute location={location} path='/forgot_password' component={ForgotPasswordPage} />
    <GuestRoute location={location} path='/reset_password/:token' component={ResetPasswordPage} />
    <UserRoute location={location} path='/confirmation/:token' component={ConfirmationPage} />
    <UserRoute location={location} exact path='/dashboard' component={DashboardPage} />
    <UserRoute location={location} path='/dashboard/add_credits' component={AddCreditsPage} />
    <UserRoute location={location} exact path='/dashboard/surveys' component={SurveysPage} />
    <UserRoute location={location} path='/dashboard/surveys/new' component={AddSurveyPage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;