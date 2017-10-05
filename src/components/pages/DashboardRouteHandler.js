import React from 'react';
import { Switch } from 'react-router-dom'

import UserRoute from '../../components/routes/UserRoute';
import Layout from './Layout';
import AddCreditsPage from './AddCreditsPage';
import DashboardPage from './DashboardPage';

const DashboardRouteHandler = ({ location, match }) => {
  console.log('match URL', match.url);
  console.log('add credits url', `${match.url}/credits/add`);
  return (
    <Layout>
      <Switch>
        <UserRoute location={location} exact path={`${match.url}`} component={DashboardPage} />
        <UserRoute location={location} exact path={`${match.url}/credits/add`} component={AddCreditsPage} />
      </Switch>
    </Layout>
  );
};

export default DashboardRouteHandler;
