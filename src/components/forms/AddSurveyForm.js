import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message, Segment, Grid, Header } from 'semantic-ui-react';

import InlineError from '../messages/InlineError';

class AddSurveyForm extends Component {
  state = {
    data: {
      title: '',
      subject: '',
      body: '',
      recipients: '',
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data)
        .then(() => {
          this.setState({ data: {
            title: '',
            subject: '',
            body: '',
            recipients: ''
          }, loading: false });
          this.setState({ loading: false })
        })
        .catch(err => {
          console.log('error in onSubmit', err);
          this.setState({ errors: err.message, loading: false })
        });
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.title) errors.title = 'Can\'t be blank';
    if (!data.subject) errors.subject = 'Can\'t be blank';
    if (!data.body) errors.body = 'Can\'t be blank';
    if (!data.recipients) errors.recipients = 'Can\'t be blank';
    return errors;
  };

  render() {
    const { title, subject, body, recipients } = this.state.data;
    const { errors, loading } = this.state;
    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        style={{ height: '100vh', minHeight: 450 }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create a new survey
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading}>
            <Segment stacked textAlign='left'>
              {errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.global}</p>
              </Message>}
              <Form.Field error={!!errors.title}>
                <label htmlFor='title'>Title</label>
                <Form.Input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title of your survey'
                  value={title}
                  onChange={this.onChange}
                />
                {errors.title && <InlineError text={errors.title} />}
              </Form.Field>
              <Form.Field error={!!errors.subject}>
                <label htmlFor='subject'>Subject</label>
                <Form.Input
                  type='text'
                  id='subject'
                  name='subject'
                  value={subject}
                  placeholder='The subject of your email'
                  onChange={this.onChange}
                />
                {errors.subject && <InlineError text={errors.subject} />}
              </Form.Field>
              <Form.Field error={!!errors.subject}>
                <label htmlFor='subject'>Body</label>
                <Form.TextArea
                  type='text'
                  id='body'
                  name='body'
                  value={body}
                  placeholder='The body of your email'
                  onChange={this.onChange}
                />
                {errors.body && <InlineError text={errors.body} />}
              </Form.Field>
              <Form.Field error={!!errors.recipients}>
                <label htmlFor='recipients'>Recipients</label>
                <Form.Input
                  type='text'
                  id='recipients'
                  name='recipients'
                  value={recipients}
                  placeholder='list of emails to send the survey'
                  onChange={this.onChange}
                />
                {errors.recipients && <InlineError text={errors.recipients} />}
              </Form.Field>
              <Button primary fluid size='large'>Create Survey</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

AddSurveyForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default AddSurveyForm;