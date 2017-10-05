import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Message } from 'semantic-ui-react';
import axios from 'axios';

class ThankYouPage extends Component {
  componentDidMount() {
    const { id, answer } = this.props.match.params;
    console.log('url', this.props.match.url);
    console.log('id', id);
    console.log('answer', answer);
    console.log('url', `/api/webhooks/${id}/${answer}`);
    axios
      .get(`/api/webhooks/${id}/${answer}`)
      .then(() => console.log('finished request'));
  }
  render() {
    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ height: '100vh' }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Thank you for your feedback!
          </Header>
          <Message>
            We&apos;ve gathered your feedback and will use it to improve our
            services.
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

ThankYouPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default ThankYouPage;
