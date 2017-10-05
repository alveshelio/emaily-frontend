import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import gravatar from 'gravatar';

import * as actions from '../../actions/auth';
import { toggleMenuState } from '../../actions/navigation';
import { getCreditsValue } from '../../actions/billing';

class TopNavigation extends Component {
  componentDidMount() {
    this.props.getCreditsValue(localStorage.getItem('bookwormJWT'));
  }
  render() {
    const { user, logout, toggleMenuState, menuVisible, credits } = this.props;
    return (
      <Menu secondary attached='top'>
        <Menu.Item onClick={() => toggleMenuState(menuVisible)}>
          <Icon name='sidebar' />Menu
        </Menu.Item>
        <Menu.Menu position='right' style={{ marginRight: 20 }}>
          <Dropdown trigger={<Image style={{ marginTop: 5 }} avatar src={gravatar.url(user.email)} />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}><Icon name='sign out' />Logout</Dropdown.Item>
              <Dropdown.Item><Icon name='usd' />Credits: {credits}</Dropdown.Item>
              <Dropdown.Item as={Link} to='/dashboard/credits/add'><Icon name='shopping basket' />Add
                Credits</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/user/${user._id}`}><Icon name='settings' />Edit Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}


TopNavigation.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleMenuState: PropTypes.func.isRequired,
  getCreditsValue: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    isConfirmed: !!state.user.confirmed,
    menuVisible: !state.navigation.menuVisible,
    credits: state.billing.credits,
  };
}

export default connect(mapStateToProps, { logout: actions.logout, toggleMenuState, getCreditsValue })(TopNavigation);
