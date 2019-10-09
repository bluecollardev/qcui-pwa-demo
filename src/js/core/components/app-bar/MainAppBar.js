import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Drawer } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { deepOrange, deepPurple, green } from '@material-ui/core/colors'

import { FluxCart } from 'quickcommerce-ui-cart'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  cartButton: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(20),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    marginLeft: theme.spacing(2),
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
    marginLeft: theme.spacing(2),
  },
}))

class RightSidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
    }
  }

  toggleDrawer(side, open) {
    /* if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    } */
    const { state } = this
    this.setState(Object.assign({}, state, {
      [side]: open,
    }))
  }

  cartContent(side) {
    return (
      <div
        // className={classes.cart}
        role="presentation"
        onClick={() => this.toggleDrawer(side, false)}
        onKeyDown={() => this.toggleDrawer(side, false)}
      >
        <FluxCart.Cart />
      </div>
    )
  }

  render() {
    const {
      top, bottom, right, left,
    } = this.state

    return (
      <Fragment>
        <Drawer className="top-drawer" anchor="top" open={top} onClose={() => this.toggleDrawer('top', false)}>
          {this.cartContent('top')}
        </Drawer>
        <Drawer className="bottom-drawer" anchor="bottom" open={bottom} onClose={() => this.toggleDrawer('bottom', false)}>
          {this.cartContent('bottom')}
        </Drawer>
        <Drawer className="right-drawer" anchor="right" open={right} onClose={() => this.toggleDrawer('right', false)}>
          {this.cartContent('right')}
        </Drawer>
        <Drawer className="left-drawer" anchor="left" open={left} onClose={() => this.toggleDrawer('left', false)}>
          {this.cartContent('left')}
        </Drawer>
      </Fragment>

    )
  }
}

function MainAppBar(props) {
  const classes = useStyles()
  const { cartItemsCount, cartDrawerRef, toggleCart } = props

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            My Demo Shop
          </Typography>
          <Button
            className={classes.cartButton}
            variant="outlined"
            color="inherit"
            aria-label="open cart"
            onClick={() => {
              if (typeof toggleCart === 'function') {
                toggleCart()
              }
            }}
          >
            My Items
            <Badge badgeContent={cartItemsCount} color="secondary" className={classes.cartIcon}>
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Avatar className={classes.avatar}>LL</Avatar>
        </Toolbar>
      </AppBar>
      <RightSidebar ref={cartDrawerRef} />
    </div>
  )
}

class MainAppBarWithContext extends Component {
  static contextTypes = {
    cartContextManager: PropTypes.object,
    cart: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      cartItemsCount: 0,
      // cartDrawerIsOpen: false,
    }
  }

  componentDidMount() {
    const { cart, cartContextManager } = this.context

    const initialCount = cart.store.getCount()
    this.setState({ cartItemsCount: initialCount })

    cartContextManager.subscribe((contextValue) => {
      console.log('update cart using context')
      console.log(contextValue)

      const count = contextValue.store.getCount()

      this.setState({
        cartItemsCount: count,
      })
    })
  }

  toggleCart() {
    console.log('toggle cart')
    this.cartDrawer.toggleDrawer('top', true)
  }

  render() {
    const { cart } = this.context
    const { cartItemsCount } = this.state

    return (
      <MainAppBar {...this.props} cart={cart} cartItemsCount={cartItemsCount} cartDrawerRef={(drawer) => this.cartDrawer = drawer} toggleCart={() => this.toggleCart()} />
    )
  }
}

export { MainAppBarWithContext }
