import React, { Component } from 'react';

import Layout from './Layout';
import AddCreditsForm from '../forms/AddCreditsForm';

class AddCreditsPage extends Component {
  render() {
    return (
      <Layout>
        <AddCreditsForm />
      </Layout>
    );
  }
}

export default AddCreditsPage;
