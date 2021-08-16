import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import _get from 'lodash.get'

import TitlePage from 'components/title-page'
import { contract } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Account = ({ ual }) => {
  const { t } = useTranslation('account')
  const dispatch = useDispatch()
  const classes = useStyles()
  const { data: user } = useSelector((state) => state.user)

  const onHandleDeleteUserRate = async (bpName) => {
    try {
      if (!user) return

      const transaction = {
        actions: [
          {
            account: contract,
            name: 'rmrate',
            authorization: [
              {
                actor: user.account_name,
                permission: 'active'
              }
            ],
            data: { user: user.account_name, bp: bpName }
          }
        ]
      }

      await ual.activeUser.signTransaction(transaction, {
        broadcast: true
      })

      await dispatch.user.deleteUserRate({
        user: user.account_name,
        bpName
      })

      await dispatch.user.getUserChainData({ ual })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getAccountInfo = async () => {
      if (ual.activeUser) {
        await dispatch.user.getUserChainData({ ual })
      }
    }

    getAccountInfo()
  }, [ual.activeUser, ual])

  return (
    <Grid container className={classes.container}>
      <TitlePage title={`${t('title')} ${user ? user.account_name : ''}`} />
      <Grid item xs={12}>
        <Paper className={classes.account}>
          <Typography variant='h5' className={classes.title}>
            {t('title')}
          </Typography>
          <Grid className={classes.box}>
            <Typography variant='subtitle1' className={classes.bold}>
              {user
                ? `${user.account_name}: ${user.core_liquid_balance}`
                : 'accountName: 0'}
            </Typography>
            <Box className={classes.rateList}>
              <List>
                {(user ? user.userRates : []).map((rate) => {
                  const imageURL = _get(
                    rate,
                    'bpjson.org.branding.logo_256',
                    null
                  )
                  const BPName = _get(
                    rate,
                    'bpjson.org.candidate_name',
                    rate.bp
                  )

                  return (
                    <Fragment key={`list-item-${rate.bp}`}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            aria-label='account'
                            className={classNames({
                              [classes.avatar]: imageURL
                            })}
                          >
                            {!imageURL ? (
                              'BP'
                            ) : (
                              <img src={imageURL} alt='' width='100%' />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={BPName}
                          secondary={rate.uniq_rating}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => onHandleDeleteUserRate(rate.bp)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </Fragment>
                  )
                })}
              </List>
            </Box>
            <Button
              className={classes.button}
              color='secondary'
              onClick={() => ual.logout()}
              variant='outlined'
            >
              {t('logout')}
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

Account.propTypes = {
  ual: PropTypes.object
}

export default Account
