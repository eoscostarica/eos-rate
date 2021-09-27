import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import classNames from 'classnames'

import TitlePage from '../../components/PageTitle'

import styles from './styles'
import Cover from './Cover'
import SubTopic from './SubTopic'
import RateCategory from './RateCategory'

const useStyles = makeStyles(styles)

const Home = () => {
  const { t } = useTranslation('home')
  const classes = useStyles()

  return (
    <Box>
      <TitlePage title={t('title')} />
      <Box
        className={classNames(
          classes.spacingContainers,
          classes.mainCoverContainer
        )}
      >
        <Cover />
      </Box>
      <Box
        className={classNames(
          classes.spacingContainers,
          classes.rateCategoryContainer
        )}
      >
        <RateCategory />
      </Box>
      <Box
        className={classNames(
          classes.spacingContainers,
          classes.mainSubTopicContainer
        )}
      >
        <SubTopic />
      </Box>
    </Box>
  )
}

export default Home
