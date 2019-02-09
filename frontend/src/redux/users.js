import userService from '../services/users'

const reducer = (users = [], action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...users, action.user]
    case 'UPDATE_USER':
      const old = users.filter(u => u._id !== action.user._id)
      return [...old, action.user]
    case 'SET_USERS':
      return action.users
    default:
      return users
  }
}

export const createUser = user => ({
  type: 'CREATE_USER',
  user
})

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
})

export const initUsers = () => async d => {
  const users = await userService.getAll()
  d({
    type: 'SET_USERS',
    users
  })
}

export default reducer
