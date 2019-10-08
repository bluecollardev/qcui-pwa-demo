import { handleActions } from 'redux-actions'
import { Map } from 'immutable'

import { constants as categoryConstants } from '../actions/categoryActions'
import staticData from './categoryReducersData'

export const reducers = {
  [categoryConstants.GET_CATEGORIES]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [categoryConstants.UPDATE_CATEGORIES]: (state, { payload }) => state.merge({
    ...payload,
  }),
  [categoryConstants.FILTER_CATEGORIES]: (state, { payload }) => state.merge({
    ...payload,
  }),
}

// TODO: Remove static data, it's in here as seed data because of the cors issue
export const initialState = () => Map({
  results: staticData || [],
})

export default handleActions(reducers, initialState())
