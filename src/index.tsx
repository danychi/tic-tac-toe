import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './redux/store'

const AppWithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

const mountNode = document.getElementById('app')
ReactDOM.render(<AppWithProvider />, mountNode)
