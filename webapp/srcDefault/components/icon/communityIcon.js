import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const CommunityIcon = props => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox='0 0 40 40' classes={{ root: classes.root }} {...props}>
      <g fill='#433F5B' fillRule='evenodd'>
        <path
          fillRule='nonzero'
          d='M26.788 38.72h3.17V14.486H10.145V38.72h2.655V20.23h2.449v18.49h9.107V20.353h2.433V38.72zm4.218 1.1h-5.265V21.453h-.338v18.365H14.2V21.33h-.353v18.49H9.096V13.386h21.91v26.433z'
        />
        <path
          fillRule='nonzero'
          d='M15.074 12.747h9.955V1.234h-9.955v11.513zm11.039 1.14H13.989V.093h12.124v13.792z'
        />
        <path d='M7.054 12.589v16.26H3.713V15.774H2.72v13.075H.103V10.934h11.863v1.559l-4.912.096z' />
        <path d='M7.577 28.85H6.53V12.038h4.925v1.1H7.577v15.71zM3.576 1.549h7.808v8.35H3.576zM32.911 12.589v16.26h3.34V15.774h.992v13.075h2.62V10.934H27.999v1.559l4.912.096z' />
        <path d='M33.435 28.85h-1.048V13.14H28.51v-1.101h4.926zM28.582 1.549h7.806v8.35h-7.806z' />
      </g>
    </SvgIcon>
  )
}

export default CommunityIcon
