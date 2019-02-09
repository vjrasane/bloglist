import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import store from './redux/store'

import 'semantic-ui-css/semantic.min.css'
import './index.styl'

const Root = (
  <Provider store={store}>
    <Router history={createHistory()}>
      <App />
    </Router>
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))
