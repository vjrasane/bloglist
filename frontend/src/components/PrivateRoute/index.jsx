import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log('RENDERING', rest.path, user)
      return user ? <Component {...props} /> : <Redirect to='/login' />
    }}
  />
)

const Connected = connect(({ user }) => ({ user }))(PrivateRoute)
export default withRouter(Connected)
