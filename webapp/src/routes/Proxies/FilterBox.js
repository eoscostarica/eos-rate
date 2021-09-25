import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import ListItem from '@mui/material/ListItem'

import ParameterRangeSelector from '../../components/ParameterRangeSelector'
import bpParameters from 'config/comparison-parameters'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(2),
    color: 'white'
  },
  listItem: {
    display: 'block'
  }
}))

const FilterBox = () => {
  const [parameters, setParameters] = useState()
  const classes = useStyles()

  useEffect(() => {
    setParameters(
      ...bpParameters.reduce(
        (result, parameter) => ({
          ...result,
          [parameter]: [0, 20]
        }),
        {}
      )
    )
  }, [])

  const handleValueChange = parameter => value => {
    // setState({
    //   [parameter]: value
    // })

    console.log({ parameter, value })
  }

  return (
    <List
      className={classes.nested}
      subheader={<ListSubheader>Filter Parameters</ListSubheader>}
    >
      {bpParameters.map(parameter => (
        <ListItem
          className={classes.listItem}
          key={`filter-parameter-${parameter}`}
        >
          <Typography id={`${parameter}-label`}>{parameter}</Typography>

          <ParameterRangeSelector
            aria-labelledby={`${parameter}-label`}
            allowCross={false}
            defaultValue={parameters[parameter]}
            onChange={() => handleValueChange(parameter)}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default FilterBox
