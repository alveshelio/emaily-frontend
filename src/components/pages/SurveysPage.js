import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './Layout';
import AllSuveys from '../listing/AllSurveys';
import AddSurveyCta from '../ctas/AddSurveyCta';

class SurveyPage extends Component {
  render() {
    return (
      <Layout>
        <AllSuveys/>
        <AddSurveyCta/>
      </Layout>
    );
  }
}

export default connect()(SurveyPage)
