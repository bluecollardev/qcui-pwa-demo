import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { constants as productConstants } from '../actions/productActions'
import staticData from './productReducersData'

export const reducers = {
  [productConstants.GET_PRODUCTS]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [productConstants.UPDATE_PRODUCTS]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [productConstants.FILTER_PRODUCTS]: (state, { payload }) => state.merge({
    ...payload,
  }),
}

// TODO: Remove static data, it's in here as seed data because of the cors issue
export const initialState = () => Map({
  results: staticData || [],
})

export default handleActions(reducers, initialState())
