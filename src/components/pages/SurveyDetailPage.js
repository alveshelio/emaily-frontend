import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider } from 'semantic-ui-react';

import SurveyDetails from '../listing/SurveyDetails';

import { fetchSurvey } from '../../actions/surveys';

class SurveyDetailPage extends Component {
  state = {
    loading: true,
    success: false
  };
  componentDidMount() {
    this.props.fetchSurvey(this.props.match.params.id)
      .then(() => this.setState({ loading: false, success: true }));
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section><Link to='/dashboard'>Dashboard</Link></Breadcrumb.Section>
          <Breadcrumb.Divider icon='right angle' />
          <Breadcrumb.Section><Link to='/dashboard/surveys'>Surveys</Link></Breadcrumb.Section>
        </Breadcrumb>
        <Divider hidden />
        <SurveyDetails survey={this.props.survey}/>
      </div>
    );
  }
}

SurveyDetailPage.propTypes = {
  // survey: PropTypes.shape({
  //   _id: PropTypes.string.isRequired,
  //
  // }).isRequired,
  fetchSurvey: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
};

const mapStateToProps = state => {
  // console.log('state in mapStateToProps', state.surveys);
  return ({
    survey: state.surveys,
  });
};

export default connect(mapStateToProps, { fetchSurvey})(SurveyDetailPage);
