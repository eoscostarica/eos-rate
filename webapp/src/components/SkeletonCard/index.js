import * as React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const SkeletonCard = () => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Skeleton
            animation='wave'
            variant='circular'
            width={50}
            height={50}
          />
        }
        title={
          <Skeleton
            animation='wave'
            height={10}
            width='80%'
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation='wave' height={10} width='40%' />}
      />
      <div className={classes.cardCenter}>
        <Skeleton
          sx={{ width: 250, height: 250 }}
          animation='wave'
          variant='circular'
        />
      </div>
      <CardContent className={classes.cardRatings}>
        <React.Fragment>
          <Skeleton
            animation='wave'
            height={20}
            width={80}
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation='wave' height={20} width={80} />
        </React.Fragment>
      </CardContent>
      <CardContent className={classes.cardButtons}>
        <React.Fragment>
          <Skeleton
            animation='wave'
            height={40}
            width={80}
            style={{ marginBottom: 6 }}
          />
          <Skeleton animation='wave' height={40} width={80} />
        </React.Fragment>
      </CardContent>
    </Card>
  )
}
export default SkeletonCard
