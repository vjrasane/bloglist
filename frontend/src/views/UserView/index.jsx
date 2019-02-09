import React from 'react'
import BlogList from '../../components/BlogList'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './index.styl'

const UserView = ({ user, blogs }) => (
  <div id='user-view'>
    {user ? (
      <div>
        <Header as='h2'>{user.name}</Header>
        <Header as='h3'>Added blogs</Header>
        <BlogList blogs={blogs} />
      </div>
    ) : null}
  </div>
)

const Connected = connect(({ users, blogs }, { match }) => ({
  user: users.find(u => u._id === match.params.id),
  blogs: blogs.filter(b => b.user._id === match.params.id)
}))(UserView)

export default withRouter(Connected)
