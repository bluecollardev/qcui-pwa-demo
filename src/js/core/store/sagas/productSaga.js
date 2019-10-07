import { put, fork, takeLatest, call } from 'redux-saga/effects'
import {
  actions as productActions,
  constants as productConstants,
} from '../actions/productActions'

import { productType } from '../types'

import staticData from '../reducers/productReducersData'

export function* getProductData(action) {
  // console.log('getProductData action')
  const { expr } = action.payload

  // TODO: Optimize this, use a throttle too
  const searchString = (typeof expr === 'string' && expr.length > 2) ? expr : null

  // Make API call
  console.log('fetch data')

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
    // const results: [productType] = data.products
    // const results: [productType] = staticData.products
    const results = data || staticData
    yield put(productActions.updateProducts(results))
  }
}

function* watchGetProducts(action) {
  console.log('watchGetProducts action')
  console.log(action)
  yield takeLatest(productConstants.GET_PRODUCTS, getProductData)
}

export function* updateProductData() {
  // pretend there is an api call
  // const result: productType = {
  // }

  // yield put(productActions.updateProducts(result))
}

function* watchUpdateProducts() {
  // yield takeLatest(productConstants.UPDATE_PRODUCTS, updateProductData)
}

export function* filterProductData() {
  // pretend there is an api call
  // const result: productType = {
  // }

  // yield put(productActions.filterProducts(result))
}

function* watchFilterProducts() {
  // yield takeLatest(productConstants.FILTER_PRODUCTS, filterProductData)
}

export const productSaga = [
  fork(watchGetProducts),
  fork(watchUpdateProducts),
  fork(watchFilterProducts),
]
