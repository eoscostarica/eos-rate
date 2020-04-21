import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: '#433F5B',
    marginTop: 8,
    marginRight: 16
  }
}))

const InfrastructureIcon = props => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox='0 0 45 40' classes={{ root: classes.root }} {...props}>
      <g fill='#433F5B' fillRule='evenodd'>
        <path
          fillRule='nonzero'
          d='M1.378 8.72h42.231V1.447H1.378V8.72zm43.608 1.448H0V0h44.986v10.168z'
        />
        <path d='M29.624 3.425h3.158v3.316h-3.158zM34.203 3.425h3.158v3.316h-3.158zM38.781 3.425h3.158v3.316h-3.158z' />
        <path
          fillRule='nonzero'
          d='M1.378 20.162h42.231v-7.276H1.378v7.276zm43.608 1.446H0V11.44h44.986v10.168z'
        />
        <path d='M29.624 14.866h3.158v3.317h-3.158zM34.203 14.866h3.158v3.317h-3.158zM38.781 14.866h3.158v3.317h-3.158z' />
        <path
          fillRule='nonzero'
          d='M1.378 31.603h42.231v-7.276H1.378v7.276zm43.608 1.445H0V22.88h44.986v10.168z'
        />
        <path d='M29.624 26.306h3.158v3.317h-3.158zM34.203 26.306h3.158v3.317h-3.158zM38.781 26.306h3.158v3.317h-3.158zM22.006 32.503h1.504v7.211h-1.504z' />
      </g>
    </SvgIcon>
  )
}

export default InfrastructureIcon
