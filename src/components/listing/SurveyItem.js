import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Button, Label } from 'semantic-ui-react';

const SurveyItem = ({ survey, sendSurvey }) => (
  <Table.Row positive={!!survey.dateSent}>
    <Table.Cell selectable><Link to={`/dashboard/surveys/${survey._id}`}>{survey.title}</Link></Table.Cell>
    <Table.Cell><Label ribbon={!!survey.dateSent}>{!!survey.dateSent ? 'Sent' : 'Not Sent'}</Label></Table.Cell>
    <Table.Cell textAlign='right'>
      <Button disabled={!!survey.dateSent} onClick={sendSurvey}>{!!survey.dateSent ? 'Survey Sent' : 'Send Survey'}</Button>
    </Table.Cell>
  </Table.Row>
);

SurveyItem.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dateSent: PropTypes.string,
  }).isRequired,
  sendSurvey: PropTypes.func.isRequired
};

export default SurveyItem;
