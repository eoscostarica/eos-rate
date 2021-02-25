import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const TransparencyIcon = (props) => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox='0 0 39 40' classes={{ root: classes.root }} {...props}>
      <g fill='#433F5B' fillRule='evenodd'>
        <path
          fillRule='nonzero'
          d='M1.364 29.466h26.689V1.433H1.364v28.033zm28.053 1.431H0V0h29.417v30.897z'
        />
        <path d='M38.509 39.81h-1.592v-1.433h.227v-.237h1.365z' />
        <path
          fillRule='nonzero'
          d='M14.18 39.912h-1.75v-1.535h1.75v1.535zm3.499 0h-1.75v-1.535h1.75v1.535zm3.498 0h-1.75v-1.535h1.75v1.535zm3.498 0h-1.749v-1.535h1.75v1.535zm3.497 0h-1.749v-1.535h1.75v1.535zm3.499 0h-1.75v-1.535h1.75v1.535zm3.497 0h-1.75v-1.535h1.75v1.535z'
        />
        <path d='M10.683 39.81H9.091v-1.67h1.365v.237h.227v1.433z' />
        <path
          fillRule='nonzero'
          d='M10.553 14.258H9.09V12.42h1.462v1.837zm0 3.673H9.09v-1.837h1.462v1.837zm0 3.675H9.09v-1.838h1.462v1.838zm0 3.674H9.09v-1.837h1.462v1.837zm0 3.673H9.09v-1.837h1.462v1.837zm0 3.675H9.09V30.79h1.462v1.837zm0 3.674H9.09v-1.837h1.462v1.837z'
        />
        <path d='M10.456 10.583H9.09v-1.67h1.592v1.431h-.227z' />
        <path
          fillRule='nonzero'
          d='M14.18 10.448h-1.75V8.913h1.75v1.535zm3.499 0h-1.75V8.913h1.75v1.535zm3.497 0h-1.748V8.913h1.748v1.535zm3.498 0h-1.75V8.913h1.75v1.535zm3.498 0h-1.749V8.913h1.75v1.535zm3.499 0h-1.75V8.913h1.75v1.535zm3.497 0h-1.75V8.913h1.75v1.535z'
        />
        <path d='M38.509 10.583h-1.365v-.239h-.227V8.913h1.592z' />
        <path
          fillRule='nonzero'
          d='M38.606 14.258h-1.462V12.42h1.462v1.837zm0 3.673h-1.462v-1.836h1.462v1.836zm0 3.675h-1.462v-1.838h1.462v1.838zm0 3.674h-1.462v-1.837h1.462v1.837zm0 3.673h-1.462v-1.837h1.462v1.837zm0 3.675h-1.462V30.79h1.462v1.837zm0 3.674h-1.462v-1.837h1.462v1.837z'
        />
        <path d='M10.348 10.358h19.581V30.96H10.348z' />
      </g>
    </SvgIcon>
  )
}

export default TransparencyIcon
