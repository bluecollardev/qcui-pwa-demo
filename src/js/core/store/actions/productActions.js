import { createAction } from 'redux-actions'

import type { productType } from '../types'

const GET_PRODUCTS = 'app/product/GET_PRODUCTS'
const UPDATE_PRODUCTS = 'app/product/UPDATE_PRODUCTS'
const FILTER_PRODUCTS = 'app/product/FILTER_PRODUCTS'

export const constants = {
  GET_PRODUCTS,
  UPDATE_PRODUCTS,
  FILTER_PRODUCTS,
}

// ------------------------------------
// Actions
// ------------------------------------
export const getProducts = createAction(GET_PRODUCTS, (expr: string) => ({ expr }))
export const updateProducts = createAction(UPDATE_PRODUCTS, (results: [productType]) => ({ results }))
export const filterProducts = createAction(FILTER_PRODUCTS, (results: [productType]) => ({ results }))

export const actions = {
  getProducts,
  updateProducts,
  filterProducts,
}
