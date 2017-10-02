import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider } from 'semantic-ui-react';

import AllSurveys from '../listing/AllSurveys';
import AddSurveyCta from '../ctas/AddSurveyCta';

class SurveyPage extends Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <AllSurveys/>
        <AddSurveyCta/>
      </div>
    );
  }
}

export default connect()(SurveyPage)
