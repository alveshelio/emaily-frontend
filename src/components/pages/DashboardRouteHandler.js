import React from 'react';
import { Switch } from 'react-router-dom'

import UserRoute from '../../components/routes/UserRoute';
import Layout from './Layout';
import AddCreditsPage from './AddCreditsPage';
import DashboardPage from './DashboardPage';

const DashboardRouteHandler = ({ location, match }) => {
  return (
    <Layout>
      <Switch>
        <UserRoute location={location} exact path={`${match.url}`} component={DashboardPage} />
        <UserRoute location={location} path={`${match.url}/add_credits`} component={AddCreditsPage} />
      </Switch>
    </Layout>
  );
}

export default DashboardRouteHandler;
