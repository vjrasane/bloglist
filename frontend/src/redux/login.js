import loginService from '../services/login.js'

const reducer = (user = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return user
  }
}

export const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    loginService.setToken(user.token)
    return {
      type: 'LOGIN',
      user
    }
  }
  return { type: null }
}

export const login = credentials => async d => {
  const user = await loginService.login(credentials)
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
  d({
    type: 'LOGIN',
    user
  })
}

export const logout = () => {
  loginService.logout()
  window.localStorage.removeItem('loggedBlogAppUser')
  return {
    type: 'LOGOUT'
  }
}

export default reducer
