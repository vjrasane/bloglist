import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../redux/login'
import { notify } from '../../redux/notifs'
import routes from '../../routes'

const menuRoutes = routes.filter(route => route.menu)

const Routes = ({ location, onClick }) =>
  menuRoutes.map(({ menu, path }) => (
    <Menu.Item
      key={menu}
      name={menu}
      active={path === location.pathname}
      onClick={onClick}
    />
  ))

const Logout = ({ logout }) => <Menu.Item name='Logout' onClick={logout} />

class AppMenu extends Component {
  navigate = name =>
    this.props.history.push(menuRoutes.find(route => route.menu === name).path)

  onClick = (e, { name }) => this.navigate(name)

  logout = () => {
    this.props.logout()
    this.props.notify('Logged out', 'message')
  }

  render = () => (
    <Menu pointing secondary>
      <Menu.Item header>Blog App</Menu.Item>
      {this.props.user && (
        <Routes location={this.props.location} onClick={this.onClick} />
      )}
      {this.props.user && (
        <Menu.Menu key={'side-menu'} position='right'>
          <Menu.Item name={this.props.user.username + ' logged in'} />
          <Logout logout={this.logout} />
        </Menu.Menu>
      )}
    </Menu>
  )
}

const Connected = connect(
  ({ user }) => ({ user }),
  { logout, notify }
)(AppMenu)

const Routed = withRouter(Connected)

export default Routed
