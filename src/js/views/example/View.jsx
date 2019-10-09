import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'querystring'

// This is i18n and i10n
// import { FormattedMessage, FormattedDate, FormattedTime } from 'react-intl'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {
  Collapse, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, Badge,
} from '@material-ui/core'

import CategoryIcon from '@material-ui/icons/Category'
import LabelIcon from '@material-ui/icons/Label'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

// import { FluxCart } from 'quickcommerce-ui-cart'

import { actions as exampleActions } from '~/modules/example/redux'
import { exampleSelector } from '~/core/store/selectors/exampleSelector'

import { actions as productActions } from '~/core/store/actions/productActions'
import { productsSelector } from '~/core/store/selectors/productSelector'

import { actions as categoryActions } from '~/core/store/actions/categoryActions'
import { categoriesSelector } from '~/core/store/selectors/categorySelector'

import { ExampleWithError } from '~/modules/example'
import { ErrorBoundary } from '~/modules/utilities'

import { Breadcrumbs } from '~/core/components/breadcrumbs'
import { ProductCard } from '~/core/components/product-card'
import { ProductSearchForm } from '~/core/components/product-search-form'

import LazyLoading from '~/modules/lazy-loading'

// This is lazy loading example
const LazyExample = LazyLoading(() => import('~/modules/example/Example'))
const BreadcrumbsWithRouter = withRouter((props) => <Breadcrumbs {...props} />)

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  sidebarList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  sidebarNestedList: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  sidebar: {
    flexGrow: 1,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  catalogTools: {
    padding: `${theme.spacing(2)}px 0`,
  },
  content: {
    flexGrow: 2,
    // padding: `0 ${theme.spacing(3)}px`,
  },
  toolbar: theme.mixins.toolbar,
}))

function SidebarFilters(props) {
  const classes = useStyles()

  const { items } = props

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCategoryClick = (id) => {
    const { onCategoryClicked } = props
    if (props && typeof onCategoryClicked === 'function') {
      // Call our actions
      // console.log(`category change handled, new value is: ${id}`)
      onCategoryClicked(id)
    }
  }

  return (
    <ErrorBoundary>
      <Grid item xs={12} sm={4} md={4} lg={3} xl={2} className={classes.sidebar}>
        <Typography component="h4">Browse By</Typography>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          /* subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          } */
          className={classes.sidebarList}
        >
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {items.map((item) => (
                <ListItem
                  button
                  className={classes.sidebarNestedList}
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                >
                  <ListItemIcon>
                    <LabelIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="product count">
                      <Badge badgeContent={item.product_count} color="primary" style={{ marginRight: '1rem' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Grid>
    </ErrorBoundary>
  )
}

function CatalogPanel({ cart, items }) {
  const classes = useStyles()

  return (
    <ErrorBoundary>
      <Grid item xs={12} sm={8} md={8} lg={9} xl={10} className={classes.content}>
        {items instanceof Array && (
        <Grid container spacing={2}>
          {items.map((item) => {
            if (item.data) {
              return (
                <Grid item key={item.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={item.data} cart={cart} />
                </Grid>
              )
            }

            return null
          })}
        </Grid>
        )}
      </Grid>
    </ErrorBoundary>
  )
}

class ExampleView extends Component {
  static propTypes = {
    example: PropTypes.object.isRequired,
    products: PropTypes.array,
  }

  static contextTypes = {
    cartContextManager: PropTypes.object,
    cart: PropTypes.object,
  }

  static defaultProps = {
    products: [],
  }

  state = {
    myArbitraryNumber: Math.floor(Math.random() * 10000),
    currentTime: new Date(),
    unlisten: null,
  }

  constructor(props) {
    super(props)

    const { history } = props

    this.unlisten = history.listen((historyState) => {
      // console.log('history state')
      // console.log(historyState)
      const queryString = (historyState.search.charAt(0) === '?')
        ? historyState.search.slice(1, historyState.search.length)
        : historyState.search

      this.searchProducts(queryString)
    })
  }

  componentDidMount() {
    const { location } = this.props
    const queryString = (location.search.charAt(0) === '?')
      ? location.search.slice(1, location.search.length)
      : location.search

    this.searchProducts(queryString)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  async setSearchString(searchString) {
    return this.setState({ searchString })
  }

  async setCategoryId(categoryId) {
    return this.setState({ categoryId })
  }

  getProducts() {
    const { getProducts } = this.props
    const { searchString, categoryId } = this.state
    getProducts({
      keywords: (typeof searchString === 'string' && searchString.length > 0) ? searchString : undefined,
      category: (typeof categoryId === 'string' && categoryId.length > 0) ? categoryId : undefined,
    })
  }

  async searchProducts(queryString) {
    if (typeof queryString === 'string' && queryString.length > 0) {
      const queryParams = qs.parse(queryString)
      // console.log('dumping query params')
      // console.log(queryParams)

      const searchString = (typeof queryParams.keyword !== 'undefined') ? queryParams.keyword : ''
      const categoryId = (typeof queryParams.category !== 'undefined') ? queryParams.category : undefined
      await this.setSearchString(searchString)
      await this.setCategoryId(categoryId)
      this.getProducts()
    }
  }

  buildQuery() {
    const { searchString, categoryId } = this.state

    const queryParams = new Set()

    if (typeof searchString === 'string') queryParams.add(`keyword=${searchString}`)
    if (typeof categoryId === 'string') queryParams.add(`category=${categoryId}`)

    return (queryParams.size > 0) ? `?${Array.from(queryParams).join('&')}` : null
  }

  buildBreadcrumbs() {
    const { categories } = this.props
    const { searchString, categoryId } = this.state

    // TODO: Get default category from store - right now we aren't saving it...
    const path = [{
      id: 'category%3A100',
      name: 'All Products',
    }]

    if (typeof categoryId === 'string') {
      // API returns eg. category:123 but the colon will be encoded...
      const category = categories.find((c) => c.id === encodeURIComponent(categoryId))
      if (category) path.push(category)
    } else {
      // console.log('something is up with this....')
    }

    return path
  }

  handleSearchExprChanged(newSearchString) {
    const { history } = this.props

    this.setSearchString(newSearchString)
      .then(() => {
        const queryString = this.buildQuery()
        history.push({
          pathname: '/search',
          search: (queryString) || undefined,
        })
      })
  }

  handleCategoryClicked(categoryId) {
    const { history } = this.props
    this.setSearchString(undefined)
    this.setCategoryId(categoryId)
      .then(() => {
        const queryString = this.buildQuery()

        history.push({
          pathname: '/search',
          search: (queryString) || undefined,
        })
      })
  }

  render() {
    const { products, categories } = this.props
    const { cart, cartContextManager } = this.context
    const { searchString } = this.state

    // Note for i18n and i10n
    // if `id` is found, it will use the matched message
    // otherwise, it will use defaultMessage as fallback
    // console.log('cart context + contextManager')
    // console.log(cart)
    // console.log(cartContextManager)

    return (
      <div style={{ marginTop: '4rem' }}>
        <ErrorBoundary>
          <ExampleWithError {...this.props} />
          {/* <FluxCart.Cart /> */}
        </ErrorBoundary>
        <Grid container alignItems="center" justify="space-between" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <Grid item>
            <BreadcrumbsWithRouter key={JSON.stringify(this.buildBreadcrumbs())} path={this.buildBreadcrumbs()} />
          </Grid>
          <Typography variant="subtitle1"><em>Remember! You need to run your browser in no-cors mode for this to work.</em></Typography>
          {products instanceof Array && (
          <Grid item>
            <ProductSearchForm
              key={searchString}
              searchString={searchString}
              itemProperty="full_name"
              items={products.map((product) => product.data)}
              categories={categories}
              cart={cart}
              onSearchExprChanged={(newValue) => this.handleSearchExprChanged(newValue)}
              label="Search"
            />
          </Grid>
          )}
        </Grid>
        <Grid container justify="space-around">
          <SidebarFilters
            items={categories}
            onCategoryClicked={(categoryId) => this.handleCategoryClicked(categoryId)}
          />
          {products instanceof Array && (
          <CatalogPanel items={products} cart={cart} />
          )}
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  example: exampleSelector(state),
  products: productsSelector(state),
  categories: categoriesSelector(state),
})

const mapDispatchToProps = {
  ...exampleActions,
  ...productActions,
  ...categoryActions,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleView)
