import React from 'react';
import { Switch } from 'react-router-dom'

import UserRoute from '../../components/routes/UserRoute';
import Layout from './Layout';
import SurveyDetailPage from './SurveyDetailPage';
import SurveysPage from './SurveysPage';
import AddSurveyPage from './AddSurveyPage';

const SurveysRouteHandler = ({ location, match }) => {
  return (
    <Layout>
      <Switch>
        <UserRoute location={location} exact path={`${match.url}`} component={SurveysPage} />
        <UserRoute location={location} path={`${match.url}/add`} component={AddSurveyPage} />
        <UserRoute location={location} path={`${match.url}/:id`} component={SurveyDetailPage} />
      </Switch>
    </Layout>
  );
};

export default SurveysRouteHandler;
