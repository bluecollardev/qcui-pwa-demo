import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { Container } from '@material-ui/core'

import LazyLoading from '~/modules/lazy-loading'

import styles from '../style/index.css'

// This is show case how you can lazy loading component
const CatalogRouteHandler = LazyLoading(() => import('views/catalog'))
// const Header = LazyLoading(() => import('~/core/components/header/Header'))
const MainAppBar = LazyLoading(() => import('~/core/components/app-bar'))

// Please remove that, it is an example
const JustAnotherPage = () => (
  <div>
    <h2>This is Just Another Page</h2>
    <p>
      Please remove this from your route, it is just to show case basic setup
      for router.
    </p>
  </div>
)

// This show case how you can access routing info in your component
const MainAppBarWithRouter = withRouter((props) => <MainAppBar {...props} />)

module.exports = (
  <div className={styles.container}>
    <MainAppBarWithRouter />
    <Container className={styles.content} maxWidth={false}>
      <Switch>
        <Route exact path="/" render={(props) => {
          return <CatalogRouteHandler {...props} />
        }}
        />
        <Route path="/search/" render={(props) => {
          return <CatalogRouteHandler {...props} />
        }}
        />
        <Route path="/page" component={JustAnotherPage} />
        <Route path="*" component={CatalogRouteHandler} />
      </Switch>
    </Container>
  </div>
)
