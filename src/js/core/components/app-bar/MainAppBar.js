import React, { PureComponent } from 'react'
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
import PropTypes from 'prop-types'

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

function MainAppBar({ cartItemsCount }) {
  const classes = useStyles()

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
          >
            My Items
            <Badge badgeContent={cartItemsCount} color="secondary" className={classes.cartIcon}>
              <ShoppingCartIcon />
            </Badge>
          </Button>
          <Avatar className={classes.avatar}>LL</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  )
}

class MainAppBarWithContext extends PureComponent {
  static contextTypes = {
    cartContextManager: PropTypes.object,
    cart: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.state = {
      cartItemsCount: 0,
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

  render() {
    const { cart } = this.context
    const { cartItemsCount } = this.state

    return (
      <MainAppBar {...this.props} cart={cart} cartItemsCount={cartItemsCount} />
    )
  }
}

export { MainAppBarWithContext }
