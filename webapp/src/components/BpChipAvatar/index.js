import React, { memo } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import _get from 'lodash.get'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const ProducerChipAvatar = ({
  data,
  classNames,
  onHandleRemove,
  imageURL,
  defaultName,
  isProxy
}) => {
  const backgroundColor = _get(data, 'data.color', '#597a81')
  const classes = useStyles({ color: backgroundColor })

  return (
    <>
      {isProxy && (
        <Chip
          className={clsx(classes.rootChip, classNames.overrideBreakpoint)}
          avatar={
            <Avatar aria-label='Block Compare' className={classNames.avatar}>
              {!imageURL ? (
                defaultName
              ) : (
                <img src={imageURL} alt='' width='100%' />
              )}
            </Avatar>
          }
          label={data.owner}
        />
      )}
      {!isProxy && (
        <Chip
          className={clsx(classes.rootChip, classNames.overrideBreakpoint)}
          avatar={
            <Avatar aria-label='Block Compare' className={classNames.avatar}>
              {!imageURL ? (
                defaultName
              ) : (
                <img src={imageURL} alt='' width='100%' />
              )}
            </Avatar>
          }
          onDelete={() => onHandleRemove(data.owner)}
          label={data.owner}
        />
      )}
    </>
  )
}

ProducerChipAvatar.propTypes = {
  data: PropTypes.object,
  classNames: PropTypes.object,
  onHandleRemove: PropTypes.func,
  imageURL: PropTypes.string,
  defaultName: PropTypes.string,
  isProxy: PropTypes.any
}

export default memo(ProducerChipAvatar)
