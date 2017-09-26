import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import Layout from './Layout';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import AddSurveyCta from '../ctas/AddSurveyCta';

class DashboardPage extends Component{

  render() {
    const { isConfirmed } = this.props;
    return (
      <Layout>
        {!isConfirmed && <ConfirmEmailMessage /> }
        <Header as="h3">Emaily Dashboard</Header>
        <AddSurveyCta/>
      </Layout>
    );
  }
}

DashboardPage.propTypes= {
  isConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
  }
}

export default connect(mapStateToProps)(DashboardPage);
