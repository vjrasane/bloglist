import React from 'react'
import Menu from './components/Menu'
import NotificationFlow from './components/NotificationFlow'
import Routes from './components/Routes'
import { withRouter } from 'react-router-dom'
import { initUser } from './redux/login'
import { initUsers, createUser, updateUser } from './redux/users'
import {
  initBlogs,
  setBlogs,
  createBlog,
  removeBlog,
  updateBlog
} from './redux/blogs'
import { connect } from 'react-redux'

import { receiveBroadcast } from './services/socket'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.props.initBlogs()
    this.props.initUser()
    this.props.initUsers()

    receiveBroadcast('blog.create', (_, data) => this.props.createBlog(data))
    receiveBroadcast('blog.remove', (_, data) => this.props.removeBlog(data))
    receiveBroadcast('blog.update', (_, data) => this.props.updateBlog(data))
    receiveBroadcast('user.create', (_, data) => this.props.createUser(data))
    receiveBroadcast('user.update', (_, data) => this.props.updateUser(data))
  }

  render = () => (
    <div>
      <NotificationFlow />
      <Menu />
      <div id='main-content'>{Routes}</div>
    </div>
  )
}

const Connected = connect(
  s => {
    return { user: s.user }
  },
  {
    initUser,
    initUsers,
    createUser,
    updateUser,
    initBlogs,
    setBlogs,
    createBlog,
    removeBlog,
    updateBlog
  }
)(App)

const Routed = withRouter(Connected)

export default Routed
