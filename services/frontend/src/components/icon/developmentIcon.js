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

const DevelopmentIcon = props => {
  const classes = useStyles()

  return (
    <SvgIcon viewBox='0 0 51 40' classes={{ root: classes.root }} {...props}>
      <g fill='#433F5B' fillRule='evenodd'>
        <path
          fillRule='nonzero'
          d='M9.488.039l-.73 1.281-2.246 3.941-.73 1.283 1.22.767 3.917 2.462.053 2.173-2.037 1.214-3.878-2.437-1.22-.767-.73 1.282L.861 15.18l-.73 1.282 1.22.766 9.44 5.935.68.427.703-.381 3.931-2.134 28.687 18.032 1.22.768.73-1.282 3.342-5.866.73-1.281-1.22-.768-28.621-17.992-.133-4.71-.024-.816-.667-.42-9.44-5.934-1.22-.767zm.49 2.048l9.441 5.935.152 5.43-.038.07L48.864 31.96l-3.343 5.865-29.364-18.459-4.636 2.515-9.44-5.934 2.246-3.943 4.588 2.886 3.5-2.087-.095-3.89L7.732 6.03l2.246-3.942z'
        />
        <path d='M44.923 35.18l-2.41-1.515 1.442-2.53 2.409 1.514z' />
      </g>
    </SvgIcon>
  )
}

export default DevelopmentIcon
