import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider } from 'semantic-ui-react';

import AddSurveyForm from '../forms/AddSurveyForm';
import { createSurvey } from '../../actions/surveys';

class AddSurveyPage extends Component {
  submit = data => {
    return this.props.createSurvey(data)
      .then((res) => console.log('response in AddSurveyPage', res));
  };

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section><Link to='/dashboard/surveys'>Surveys</Link></Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <AddSurveyForm submit={this.submit} />
      </div>
    );
  }
}

AddSurveyPage.propTypes = {
  createSurvey: PropTypes.func.isRequired,
};

export default connect(null, { createSurvey })(AddSurveyPage)
