import { put, fork, takeLatest, call } from 'redux-saga/effects'
import {
  actions as categoryActions,
  constants as categoryConstants,
} from '../actions/categoryActions'

import { categoryType } from '../types'

import staticData from '../reducers/categoryReducersData'

export function* getCategoryData(action) {
  // console.log('getCategoryData action')
  const { expr } = action.payload

  // TODO: Optimize this, use a throttle too
  const searchString = (typeof expr === 'string' && expr.length > 2) ? expr : null

  // Make API call
  console.log('fetch category data')

  if (searchString) {
    // TODO: Sanitize string
    const response = yield call(fetch(`https://www.mec.ca/api/v1/products/search?keywords=${searchString}`, {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Origin': 'http://localhost:8080',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    }))

    const data = yield response.json()

    // TODO: CORS is busted, just patch in data for now
    // const results: [categoryType] = data.categories
    // const results: [categoryType] = staticData.categories
    const results = data || staticData
    yield put(categoryActions.updateCategories(results))
  }
}

function* watchGetCategories(action) {
  // console.log('watchGetCategories action')
  // console.log(action)
  yield takeLatest(categoryConstants.GET_CATEGORIES, getCategoryData)
}

export function* updateCategoryData() {
  // pretend there is an api call
  // const result: categoryType = {
  // }

  // yield put(categoryActions.updateCategories(result))
}

function* watchUpdateCategories() {
  // yield takeLatest(categoryConstants.UPDATE_CATEGORIES, updateCategoryData)
}

export function* filterCategoryData() {
  // pretend there is an api call
  // const result: categoryType = {
  // }

  // yield put(categoryActions.filterCategories(result))
}

function* watchFilterCategories() {
  // yield takeLatest(categoryConstants.FILTER_CATEGORIES, filterCategoryData)
}

export const categorySaga = [
  fork(watchGetCategories),
  fork(watchUpdateCategories),
  fork(watchFilterCategories),
]
