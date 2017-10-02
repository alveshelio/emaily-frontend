import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

const AddSurveyCta = () => (
  <Card centered>
    <Card.Content textAlign='center'>
      <Card.Header>Add New Survey</Card.Header>
      <Link to='/dashboard/surveys/add'><Icon name='plus circle' size='massive' /></Link>
    </Card.Content>
  </Card>
);

export default AddSurveyCta;
