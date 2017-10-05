import React, { Component } from 'react';
import { Segment, Form, Message, Grid, Header } from 'semantic-ui-react';

import InlineError from '../messages/InlineError';
import Payments from '../billing/Payments';

class AddCreditsForm extends Component {
  state = {
    data: {
      amount: 5,
    },
    stripeButtonDisabled: false,
    loading: false,
    errors: {}
  };

  onChangeNumber = e => {
    let stripeButtonDisabled;
    e.target.value >= 5 ? stripeButtonDisabled = false : stripeButtonDisabled = true;
    return this.setState({
      ...this.state,
      stripeButtonDisabled,
      data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
    });
  };

  render() {
    const { amount } = this.state.data;
    const { errors, loading } = this.state;

    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        style={{ height: '100vh' }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Message>
            <Header as='h2' color='teal' textAlign='center'>
              Add credits to your account
            </Header>
            <p>Minimum amount USD $5.00</p>
          </Message>
          <Form loading={loading}>
            <Segment stacked textAlign='left'>
              {
                errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                <p>{errors.global}</p>
              </Message>
              }
              <Form.Field error={!!errors.amount}>
                <label htmlFor='amount'>Amount</label>
                <Form.Input
                  type='number'
                  min='5'
                  max='100'
                  step='1'
                  id='amount'
                  name='amount'
                  icon='usd'
                  iconPosition='left'
                  placeholder='0.00'
                  value={amount}
                  onChange={this.onChangeNumber}
                />
                {errors.amount && <InlineError text={errors.amount}/>}
              </Form.Field>
            </Segment>
          </Form>
          <Message><Payments disabled={this.state.stripeButtonDisabled} amount={parseInt(amount * 100, 10)} /></Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddCreditsForm;
