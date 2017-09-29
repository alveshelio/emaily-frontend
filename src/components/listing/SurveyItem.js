import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'semantic-ui-react';

const SurveyItem = ({ title, status, sendSurvey }) => (
  <Table.Row>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{status}</Table.Cell>
    <Table.Cell textAlign='right'>
      <Button onClick={sendSurvey}>Send Survey</Button>
    </Table.Cell>
  </Table.Row>
);

SurveyItem.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  sendSurvey: PropTypes.func.isRequired
};

export default SurveyItem;
