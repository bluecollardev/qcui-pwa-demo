import { createSelector } from 'reselect'

const categoriesDataSelector = (state) => state.category

const resultsSelector = createSelector(
  categoriesDataSelector,
  (payload) => payload.get('results')
)

export const categoriesSelector = (state) => {
  return resultsSelector(state) || []
}
