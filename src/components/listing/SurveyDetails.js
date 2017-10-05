import React from 'react';
import moment from 'moment';
import { Segment, Header, Divider, Grid } from 'semantic-ui-react';

const SurveyDetails = ({ survey }) => {
  // console.log('survey dateSent', survey.dateSent);
  return (
    <Segment.Group>
      <Segment><Header as='h2'>{survey.title}</Header></Segment>
      <Segment.Group>
        <Segment><Header as='h4'>Subject: </Header>{survey.subject}</Segment>
        <Segment><Header as='h4'>Body: </Header>{survey.body}</Segment>
      </Segment.Group>
      <Segment><Header as='h3'>Survey Meta</Header></Segment>
      <Grid relaxed centered>
        <Grid.Row>
          <Grid.Column mobile={16} computer={5} largeScreen={5}>
            <Segment><Header as='h4'>Created On: </Header>{moment(survey.createdAt).format("YYYY-MM-DD HH:mm")}</Segment>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} largeScreen={5}>
            <Segment><Header as='h4'>Sent On: </Header>{survey.dateSent ? moment(survey.dateSent).format("YYYY-MM-DD HH:mm") : 'Not sent'}</Segment>
          </Grid.Column>
          <Grid.Column mobile={16} computer={5} largeScreen={5}>
            <Segment>
              <Header as='h4'>Last Response: </Header>
              {survey.lastResponded ? moment(survey.lastResponded).format("YYYY-MM-DD HH:mm") : 'No responses yet'}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Segment><Header as='h3'>Recipients</Header></Segment>
      <Segment.Group>
        <div style={{ overflowY: 'auto', height: 'auto', maxHeight: 420}}>
          {survey.recipients ? survey.recipients.map((recipient, i) => <Segment key={i}>{recipient.email}</Segment>) : ''}
        </div>
      </Segment.Group>
    </Segment.Group>
  );
};

export default SurveyDetails;
