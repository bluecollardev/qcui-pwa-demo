import { put, fork, takeLatest, call } from 'redux-saga/effects'
import qs from 'querystring'

import {
  actions as productActions,
  constants as productConstants,
} from '../actions/productActions'

import { productType } from '../types'

import staticData from '../reducers/productReducersData'

export function* getProductData(action) {
  // console.log('getProductData action')
  const { params } = action.payload
  const filteredParams = {}

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined) {
      filteredParams[key] = params[key]
    }
  })

  try {
    // Make API call
    console.log('fetch data')
    const response = yield call(fetch, `https://www.mec.ca/api/v1/products/search?${qs.stringify(filteredParams)}`, {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'Origin': 'http://localhost:8080',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const data = yield call([response, response.json])
    console.log(data)
    yield put(productActions.updateProducts(data.products))
  } catch (err) {
    console.log('saga error')
    console.log(err)
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
