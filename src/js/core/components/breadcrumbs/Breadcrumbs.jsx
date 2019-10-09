import React, { Fragment } from 'react'

import { Breadcrumbs, Link, Typography } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import { makeStyles } from '@material-ui/core/styles'

import styles from './Breadcrumbs.css'

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    padding: `${theme.spacing(3)}px 0`,
  },
}))

export default function CatalogBreadcrumbs(props) {
  const { location, path, history } = props
  const { pathname } = location

  const classes = useStyles()

  function handleClick(e, categoryId) {
    e.preventDefault()
    history.push({
      pathname: '/search',
      search: `?category=${categoryId}`,
    })
  }

  // console.log('dumping path')
  // console.log(path)

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      className={classes.breadcrumbs}
    >
      {path.map((chunk, idx) => {
        let chunkElement = null
        if (idx < path.length - 1) {
          chunkElement = <Link key={chunk.id} color="inherit" href="/" onClick={(e) => handleClick(e, chunk.id)}>{chunk.name}</Link>
        }

        if (idx === path.length - 1) {
          chunkElement = <Typography key={chunk.id} color="textPrimary">{chunk.name}</Typography>
        }

        return chunkElement
      })}
    </Breadcrumbs>
  )
}
