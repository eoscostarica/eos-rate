import * as React from 'react'
import Button from '@mui/material/Button'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Stack from '@mui/material/Stack'

const MenuDropDown = () => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <IconButton
    onClick={handleClick}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup='true'
    aria-expanded={open ? 'true' : undefined}
  >
    <AccountIcon className={classes.icon} />
    <Typography className={classes.textBtn}>
      {user.accountName}
    </Typography>
  </IconButton>
  <Menu
    anchorEl={anchorEl}
    id='account-menu'
    open={open}
    onClose={handleClose}
    onClick={handleClose}
  >
    <MenuItem className={classes.onSignOut} onClick={onSignOut}>
      <ExitIcon className={classes.iconLanguage} />
      <Typography className={classes.signOut}>
        {t('signOut')}
      </Typography>
    </MenuItem>
  </Menu>
  )
}
export default MenuDropDown
