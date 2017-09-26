import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Message, Grid, Segment, Header } from 'semantic-ui-react';
import validator from 'validator';

import InlineError from '../messages/InlineError';

class SignupForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
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
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = (data) => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = 'Can\'t be blank';
    return errors;
  };

  render() {
    const { email, password } = this.state.data;
    const { errors, loading } = this.state;
    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        style={{ height: '100vh', minHeight: 400 }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign up to Emaily
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading}>
            <Segment textAlign='left'>
              {errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.global}</p>
              </Message>}
              <Form.Field error={!!errors.email}>
                <label htmlFor='email'>Email</label>
                <Form.Input
                  type='email'
                  id='email'
                  name='email'
                  icon='user'
                  iconPosition='left'
                  placeholder='example@example.com'
                  value={email}
                  onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
              </Form.Field>
              <Form.Field error={!!errors.password}>
                <label htmlFor='password'>Password</label>
                <Form.Input
                  type='password'
                  id='password'
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  value={password}
                  placeholder='Make it secure'
                  onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
              </Form.Field>
              <Button primary fluid>Sign Up</Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignupForm;