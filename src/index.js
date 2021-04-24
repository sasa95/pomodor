import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/fonts/Inter/inter.css'
import App from './App'
import configureStore from './store'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
reportWebVitals()
