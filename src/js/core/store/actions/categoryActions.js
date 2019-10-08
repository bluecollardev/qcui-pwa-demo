import { createAction } from 'redux-actions'

import type { categoryType } from '../types'

const GET_CATEGORIES = 'app/category/GET_CATEGORIES'
const UPDATE_CATEGORIES = 'app/category/UPDATE_CATEGORIES'
const FILTER_CATEGORIES = 'app/category/FILTER_CATEGORIES'

export const constants = {
  GET_CATEGORIES,
  UPDATE_CATEGORIES,
  FILTER_CATEGORIES,
}

// ------------------------------------
// Actions
// ------------------------------------
export const getCategories = createAction(GET_CATEGORIES, (expr: string) => ({ expr }))
export const updateCategories = createAction(UPDATE_CATEGORIES, (results: [categoryType]) => ({ results }))
export const filterCategories = createAction(FILTER_CATEGORIES, (results: [categoryType]) => ({ results }))

export const actions = {
  getCategories,
  updateCategories,
  filterCategories,
}
