import React from 'react'
import { Segment, Header, Button, Form, Input, Label } from 'semantic-ui-react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import userService from '../../services/users'
import { login } from '../../redux/login'
import { notify } from '../../redux/notifs'
import './index.styl'

const FieldError = ({ message }) => (
  <Label basic color='red' pointing>
    {message}
  </Label>
)

class LoginView extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {}
  }

  register = async () => {
    const { users } = this.props
    const { username, password } = this.state
    let errors = {}
    if (!username) {
      errors.username = 'Choose a username!'
    }

    if (users.some(u => u.name === username)) {
      errors.username = 'That username is taken!'
    }

    if (password.length < 3) {
      errors.password = 'Password must be at least 3 characters'
    }

    this.setState({ errors })
    if (!Object.keys(errors).length) {
      try {
        await userService.create(this.state)
        this.props.notify(`Created new user '${username}'`, 'success')
        this.setState({ username: '', password: '' })
      } catch (ex) {
        this.props.notify(`Failed to register: ${ex}`, 'error')
      }
    }
  }

  login = async () => {
    try {
      const { username } = this.state
      await this.props.login(this.state)
      this.props.notify(`Logged in as ${username}`, 'message')
    } catch (ex) {
      this.props.notify('invalid username or password', 'error')
    }
  }

  updateField = field => (e, { value }) => this.setState({ [field]: value })

  render () {
    const { errors } = this.state
    return (
      <div id='login-view'>
        <div id='login-fields'>
          <Header as='h5' attached='top'>
            Login to application
          </Header>
          <Segment attached>
            <Form>
              <Form.Field>
                <label>Username</label>
                <Input
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.updateField('username')}
                />
                {errors.username && <FieldError message={errors.username} />}
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Input
                  placeholder='Password'
                  type='password'
                  value={this.state.password}
                  onChange={this.updateField('password')}
                />
                {errors.password && <FieldError message={errors.password} />}
              </Form.Field>
              <Button onClick={this.login}>Login</Button>
              <Button onClick={this.register}>Register</Button>
            </Form>
          </Segment>
        </div>
      </div>
    )
  }
}

const Redirected = ({ user, ...props }) =>
  user ? <Redirect to='/' /> : <LoginView {...props} />

const Connected = connect(
  ({ user, users }) => ({ user, users }),
  { login, notify }
)(Redirected)

export default withRouter(Connected)
