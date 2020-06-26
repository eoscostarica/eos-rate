import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'
import { RicardianContract } from '@eoscostarica/eoscr-components'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    '& svg': {
      fontSize: '35px !important'
    },
    '& h4': {
      fontSize: '15px !important',
      fontWeight: '600'
    },
    '& a': {
      lineBreak: 'anywhere'
    },
    [theme.breakpoints.up('sm')]: {
      '& svg': {
        fontSize: '45px !important'
      },

      '& h4': {
        fontSize: '34px !important',
        fontWeight: 'normal'
      }
    }
  }
}))

const TermsOfUse = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <RicardianContract name='rateproducer' />
    </Box>
  )
}

export default TermsOfUse
