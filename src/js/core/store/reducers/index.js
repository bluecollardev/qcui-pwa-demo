import { combineReducers } from 'redux'
// Example importing from a module
import example from '~/modules/example/redux'
// Example importing a core slice
import product from './productReducers'
import category from './categoryReducers'

export default combineReducers({
  example,
  product,
  category,
})
