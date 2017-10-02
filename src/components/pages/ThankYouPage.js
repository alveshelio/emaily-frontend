import React from 'react';
import { Grid, Header, Message } from 'semantic-ui-react';

const ThankYouPage = () => (
  <Grid
    textAlign='center'
    verticalAlign='middle'
    style={{ height: '100vh'}}
  >
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        Thank you for your feedback!
      </Header>
      <Message>
        We've gathered your feedback and will use it to improve our services.
      </Message>
    </Grid.Column>
  </Grid>
);

export default ThankYouPage;
