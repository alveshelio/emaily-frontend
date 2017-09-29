import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Layout from './Layout';
import AddSurveyForm from '../forms/AddSurveyForm';
import { createSurvey } from '../../actions/surveys';

class AddSurveyPage extends Component {
  submit = data => {
    return this.props.createSurvey(data)
      .then((res) => console.log('response in AddSurveyPage', res));
  };

  render() {
    return (
      <Layout>
        <AddSurveyForm submit={this.submit} />
      </Layout>
    );
  }
}

AddSurveyPage.propTypes = {
  createSurvey: PropTypes.func.isRequired,
};

export default connect(null, { createSurvey })(AddSurveyPage)
