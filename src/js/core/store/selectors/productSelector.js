import { createSelector } from 'reselect'

const productsDataSelector = (state) => state.product

const resultsSelector = createSelector(
  productsDataSelector,
  (payload) => payload.get('results')
)

export const productsSelector = (state) => {
  const products = resultsSelector(state).map((product) => {
    // Map the object ID, in this case it's product_code
    return {
      id: product.product_code,
      quantity: 1,
      data: product,
      options: [],
    }
  }) || []

  return products
}
