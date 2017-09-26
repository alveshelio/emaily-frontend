import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Menu,
  Icon,
  Sidebar
} from 'semantic-ui-react';

import TopNavigation from '../navigation/TopNavigation';

class Layout extends Component{

  render() {
    const { menuVisible } = this.props;
    return (
      <div>
        <TopNavigation />
        <Sidebar.Pushable as={Segment} attached="bottom" >
          <Sidebar as={Menu} animation="uncover" visible={menuVisible} icon="labeled" vertical inverted>
            <Menu.Item><Icon name="home" />Home</Menu.Item>
            <Menu.Item><Icon name="block layout" />Topics</Menu.Item>
            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
            <Menu.Item><Icon name="calendar" />History</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic style={{height: '100vh'}}>
              {this.props.children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

Layout.propTypes= {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    menuVisible: state.navigation.menuVisible
  }
}

export default connect(mapStateToProps)(Layout);
