import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Label } from 'semantic-ui-react';

const SurveyItem = ({ title, sent, sendSurvey }) => (
  <Table.Row positive={sent}>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell><Label ribbon={sent}>{sent ? 'Sent' : 'Not Sent'}</Label></Table.Cell>
    <Table.Cell textAlign='right'>
      <Button disabled={sent} onClick={sendSurvey}>{sent ? 'Survey Sent' : 'Send Survey'}</Button>
    </Table.Cell>
  </Table.Row>
);

SurveyItem.propTypes = {
  title: PropTypes.string.isRequired,
  sent: PropTypes.bool.isRequired,
  sendSurvey: PropTypes.func.isRequired
};

export default SurveyItem;
