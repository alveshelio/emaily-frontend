import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Message, Segment, Grid, Header } from 'semantic-ui-react';
import validator from 'validator';

import InlineError from '../messages/InlineError';

class LoginForm extends Component {
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
        .catch(err => {
          console.log('error in onSubmit', err);
          this.setState({ errors: err.response.data.errors, loading: false })
        });
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
        style={{ height: '100vh'}}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <Form onSubmit={this.onSubmit} loading={loading}>
            <Segment stacked textAlign='left'>
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
              <Button primary fluid size='large'>Login</Button>
              <Link style={{ paddingTop: '8px', display: 'block' }} to='/forgot_password'>Forgot password</Link>
            </Segment>
          </Form>
          <Message>
            New to Emaily? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;