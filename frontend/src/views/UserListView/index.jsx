import React from 'react'
import { List } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { notify } from '../../redux/notifs'
import { connect } from 'react-redux'
import './index.styl'

const navigate = history => user => () => history.push(`/users/${user._id}`)

const User = ({ user, navigate }) => (
  <List.Item onClick={navigate(user)}>
    <List.Icon name='user' size='large' verticalAlign='middle' />
    <List.Content>
      <List.Header as='a'>{user.name}</List.Header>
      <List.Description as='a'>
        {user.blogs.length + ' blogs posted'}
      </List.Description>
    </List.Content>
  </List.Item>
)

const UserListView = ({ users, history }) => (
  <div id='user-list-view'>
    <List animated divided relaxed>
      {users.map(u => (
        <User key={u.name} user={u} navigate={navigate(history)} />
      ))}
    </List>
    <hr />
  </div>
)

const Connect = connect(
  ({ users }) => ({ users }),
  { notify }
)(UserListView)

export default withRouter(Connect)
