import React from 'react'
import ReactDOM from 'react-dom'
import { fromJS } from 'immutable'

import routes from './routes'
import App from './App'

import * as serviceWorker from '../static/serviceWorker'

import { configureStore } from './core/store'
import { history } from './app-history'

let initialState = {}

// rehydrate initialState for JS app
if (window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__

  // Transform into Immutable.js collections,
  // but leave top level keys untouched for Redux
  Object.keys(initialState).forEach((key) => {
    initialState[key] = fromJS(initialState[key])
  })
}

const store = configureStore(initialState, history)

// Render the React application to the DOM
// Root component is to bootstrap Provider, Router and DevTools
ReactDOM.render(
  <App
    history={history}
    routes={routes}
    store={store}
    mappings={{
      inventoryItem: {
        ITEM_ID: 'product_code',
      },
    }}
  />,
  document.getElementById('app-container')
)

// Register service worker, comment this out if you don't want it
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
}
