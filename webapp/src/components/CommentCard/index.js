import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import Moment from 'react-moment'
import MenuItem from '@mui/material//MenuItem'
import Menu from '@mui/material//Menu'

import styles from './styles'

const useStyles = makeStyles(styles)

export const commentsJSON = [
  {
    date: '2021-04-19T12:59-0500',
    username: 'paoeosrate2165',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor dolor, molestie ac arcu quis, faucibus blandit felis. Suspendisse eget urna porta, imperdiet magna quis, lacinia nulla. Aenean porttitor risus eu porta ultricies. Donec nec finibus mi. Donec et mi imperdiet, aliquam mi ac, tempor ante. Nam molestie bibendum cursus. Donec eget elit imperdiet, vulputate diam eu, iaculis quam. In id congue ex, id congue leo. Ut ultrices congue justo, euismod pulvinar diam luctus id. Aliquam gravida, velit consequat placerat condimentum, erat ante facilisis dolor, at iaculis nisl ligula eu arcu.',
    community: 0,
    development: 0,
    infrastructure: 0,
    transparency: 0,
    trustiness: 0,
    like: 0,
    dislike: 0
  },
  {
    date: '2021-07-19T12:59-0500',
    username: 'paoeosrate2165',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor dolor, molestie ac arcu quis, faucibus blandit felis. Suspendisse eget urna porta, imperdiet magna quis, lacinia nulla. Aenean porttitor risus eu porta ultricies. Donec nec finibus mi. Donec et mi imperdiet, aliquam mi ac, tempor ante. Nam molestie bibendum cursus. Donec eget elit imperdiet, vulputate diam eu, iaculis quam. In id congue ex, id congue leo. Ut ultrices congue justo, euismod pulvinar diam luctus id. Aliquam gravida, velit consequat placerat condimentum, erat ante facilisis dolor, at iaculis nisl ligula eu arcu.',
    community: 0,
    development: 0,
    infrastructure: 0,
    transparency: 0,
    trustiness: 0,
    like: 0,
    dislike: 0
  },
  {
    date: '2022-02-28T12:59-0500',
    username: 'paoeosrate2165',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor dolor, molestie ac arcu quis, faucibus blandit felis. Suspendisse eget urna porta, imperdiet magna quis, lacinia nulla. Aenean porttitor risus eu porta ultricies. Donec nec finibus mi. Donec et mi imperdiet, aliquam mi ac, tempor ante. Nam molestie bibendum cursus. Donec eget elit imperdiet, vulputate diam eu, iaculis quam. In id congue ex, id congue leo. Ut ultrices congue justo, euismod pulvinar diam luctus id. Aliquam gravida, velit consequat placerat condimentum, erat ante facilisis dolor, at iaculis nisl ligula eu arcu.',
    community: 0,
    development: 0,
    infrastructure: 0,
    transparency: 0,
    trustiness: 0,
    like: 7,
    dislike: 0
  },
  {
    date: '2022-02-19T12:59-0500',
    username: 'paoeosrate2165',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tortor dolor, molestie ac arcu quis, faucibus blandit felis. Suspendisse eget urna porta, imperdiet magna quis, lacinia nulla. Aenean porttitor risus eu porta ultricies. Donec nec finibus mi. Donec et mi imperdiet, aliquam mi ac, tempor ante. Nam molestie bibendum cursus. Donec eget elit imperdiet, vulputate diam eu, iaculis quam. In id congue ex, id congue leo. Ut ultrices congue justo, euismod pulvinar diam luctus id. Aliquam gravida, velit consequat placerat condimentum, erat ante facilisis dolor, at iaculis nisl ligula eu arcu.',
    community: 0,
    development: 0,
    infrastructure: 0,
    transparency: 0,
    trustiness: 0,
    like: 12,
    dislike: 0
  }
]

const options = ['Latest Comments', 'Most Helpful']

const CommentCard = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    if (index === 0) {
      commentsJSON.sort(
        (a, b) =>
          new Date(...b.date.split('/').reverse()) -
          new Date(...a.date.split('/').reverse())
      )
    }
    if (index === 1) {
      commentsJSON.sort((a, b) => (a.like < b.like ? 1 : -1))
    }
  }
  // componentDidMount(){
  //   // Runs after the first render() lifecycle
  // }
  useEffect(() => {
    handleMenuItemClick(onloadstart, 0)
  }, [])
  return (
    <Grid pt={6} container justifyContent='center' md={12}>
      <Grid className={classes.sectionContent} item md={12} xs={12}>
        <Box className={classes.cardContainer}>
          <Box display='flex' justifyContent='end' alignItems='center'>
            <Typography flex={1} mt='28px' mb='44px' variant='h6'>
              User Comments
            </Typography>
            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              className={classes.btnFilter}
            >
              <FilterListIcon />
              <Typography
                textTransform='uppercase'
                marginLeft={1}
                variant='body2'
              >
                {options[selectedIndex]}
              </Typography>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id='account-menu'
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={event => handleMenuItemClick(event, index)}
                >
                  <Typography variant='body3' textTransform='uppercase'>
                    {option}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box pl={2}>
            {(commentsJSON || []).map((comment, index) => (
              <Box pt='12px' pb='12px' key={index}>
                <Box display='flex'>
                  <Typography variant='body2' display='flex' flex={1} mb={2}>
                    {comment.username}
                  </Typography>
                  <Typography
                    variant='body2'
                    display='flex'
                    flex={1}
                    mb={2}
                    justifyContent='end'
                  >
                    <Moment fromNow>{comment.date}</Moment>
                  </Typography>
                </Box>
                <Typography>{comment.comment}</Typography>
                <Box display='flex'>
                  <Box justifyContent='space-between' className={classes.box}>
                    <Typography variant='body2'>
                      Community: {comment.community}
                    </Typography>
                    <Typography variant='body2'>
                      Development: {comment.development}
                    </Typography>
                    <Typography variant='body2'>
                      Infrastructure: {comment.infrastructure}
                    </Typography>
                    <Typography variant='body2'>
                      Transparency: {comment.transparency}
                    </Typography>
                    <Typography variant='body2'>
                      Trustiness: {comment.trustiness}
                    </Typography>
                  </Box>
                  <Box justifyContent='end' width='20%' className={classes.box}>
                    <Typography
                      variant='body3'
                      textTransform='uppercase'
                      mr={1}
                    >
                      Is this helpful?
                    </Typography>
                    <Typography variant='body3' className={classes.likeNum}>
                      {comment.like}
                      <IconButton>
                        <ThumbUpIcon className={classes.thumb} />
                      </IconButton>
                    </Typography>
                    <Typography variant='body3' className={classes.dislikeNum}>
                      {comment.dislike}
                      <IconButton>
                        <ThumbDownIcon className={classes.thumb} />
                      </IconButton>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
export default CommentCard
