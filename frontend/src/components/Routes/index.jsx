import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../PrivateRoute'
import routes from '../../routes'

export default routes.map(({ path, login, ...props }) =>
  login ? (
    <PrivateRoute key={path} path={path} {...props} />
  ) : (
    <Route key={path} path={path} {...props} />
  )
)
