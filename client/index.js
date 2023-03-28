import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// eslint-disable-next-line no-unused-vars
import initializeFirebase from './api/firebase'

import App from './components/App'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app')).render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
})
