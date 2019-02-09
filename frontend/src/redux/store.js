import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './blogs'
import notifReducer from './notifs'
import userReducer from './users'
import loginReducer from './login'

const reducer = combineReducers({
  blogs: blogReducer,
  notifs: notifReducer,
  users: userReducer,
  user: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
