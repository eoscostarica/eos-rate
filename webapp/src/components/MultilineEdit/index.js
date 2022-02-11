import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { makeStyles } from '@mui/styles'
import InlineEdit from '@atlaskit/inline-edit'
import Textfield from '@atlaskit/textfield'
import {
  fontSize as getFontSize,
  gridSize as getGridSize
} from '@atlaskit/theme/constants'

import styles from './styles'

const useStyles = makeStyles(styles)

const fontSize = getFontSize()
const gridSize = getGridSize()

const MultilineEdit = ({ text }) => {
  const [editValue, setEditValue] = useState('')
  const classes = useStyles()

  const ReadViewContainer = css({
    display: 'flex',
    fontSize: `${fontSize}px`,
    lineHeight: `${(gridSize * 2.5) / fontSize}`,
    maxWidth: '100%',
    minHeight: `${(gridSize * 2.5) / fontSize}em`,
    padding: `${gridSize}px ${gridSize - 2}px`,
    wordBreak: 'break-word'
  })

  return (
    <div
      style={{
        padding: `${gridSize}px ${gridSize}px`,
        fontSize: '1rem',
        fontWeight: '400'
      }}
    >
      <InlineEdit
        defaultValue={editValue}
        label='Inline edit'
        editView={({ errorMessage, ...fieldProps }) => (
          <Textfield {...fieldProps} autoFocus />
        )}
        readView={() => (
          <div
            className={classes.infoText}
            css={ReadViewContainer}
            data-testid='read-view'
          >
            {editValue || text}
          </div>
        )}
        onConfirm={value => setEditValue(value)}
      />
    </div>
  )
}
MultilineEdit.propTypes = {
  text: PropTypes.any
}
export default MultilineEdit
