import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import Layout from './Layout';

class DashboardPage extends Component{
  render() {
    const { isConfirmed } = this.props;
    return (
      <Layout>
        {!isConfirmed && <ConfirmEmailMessage /> }
        <Header textAlign='center' as="h3">Emaily Dashboard</Header>
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
