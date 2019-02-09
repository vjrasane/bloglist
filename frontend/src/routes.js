import React from 'react'
import { Redirect } from 'react-router-dom'
import BlogListView from './views/BlogListView'
import BlogView from './views/BlogView'
import UserListView from './views/UserListView'
import LoginView from './views/LoginView'
import UserView from './views/UserView'

export default [
  {
    path: '/',
    component: () => <Redirect to='/blogs' />,
    exact: true
  },
  {
    path: '/blogs',
    menu: 'blogs',
    component: BlogListView,
    exact: true,
    login: true
  },
  {
    path: '/users',
    menu: 'users',
    component: UserListView,
    exact: true,
    login: true
  },
  {
    path: '/users/:id',
    component: UserView,
    exact: true,
    login: true
  },
  {
    path: '/blogs/:id',
    component: BlogView,
    exact: true,
    login: true
  },
  {
    path: '/login',
    component: LoginView,
    exact: true
  }
]
