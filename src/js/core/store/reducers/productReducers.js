import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { constants as productConstants } from '../actions/productActions'
import staticData from './productReducersData'

export const reducers = {
  [productConstants.GET_PRODUCTS]: (state, { payload }) => {
    // console.log('get products reducer')
    // console.log(payload)
    const newState = state.merge({
      ...payload,
    })

    // console.log(newState)
    // console.log('-------')

    return newState
  },
  [productConstants.UPDATE_PRODUCTS]: (state, { payload }) => {
    // console.log('update products reducer')
    // console.log(payload)
    const newState = state.merge({
      ...payload,
    })

    // console.log(newState)
    // console.log('-------')

    return newState
  },
  [productConstants.FILTER_PRODUCTS]: (state, { payload }) => {
    // console.log('filter products reducer')
    const newState = state.merge({
      ...payload,
    })

    // console.log(newState)
    // console.log('-------')

    return newState
  },
}

// TODO: Remove static data, it's in here as seed data because of the cors issue
export const initialState = () => Map({
  results: staticData || [],
})

export default handleActions(reducers, initialState())
