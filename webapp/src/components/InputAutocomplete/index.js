import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import Highlight from 'react-highlighter'
import Autosuggest from 'react-autosuggest'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import _get from 'lodash.get'
import MenuItem from '@mui/material/MenuItem'

import useDebounce from '../../hooks/useDebounce'
import { GET_ITEM_BY_NAME } from '../../gql'

import styles from './styles'

const useStyles = makeStyles(styles)

const InputAutocomplete = ({ ...props }) => {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('translations')
  const [searchText, setSearchText] = useState('')
  const debouncedAccount = useDebounce(searchText, 300)
  const [getData, { loading, data }] = useLazyQuery(GET_ITEM_BY_NAME, {
    fetchPolicy: 'network-only'
  })
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (loading || !data) {
      return
    }

    const { producers, proxies } = data
    const bpsList = (producers || []).map(bp => {
      const name = _get(bp, 'bpjson.org.candidate_name', bp.owner)

      return { owner: bp.owner, name, path: '/block-producers/' }
    })
    const proxiesList = (proxies || []).map(proxy => {
      return { ...proxy, path: '/proxies/' }
    })

    setSuggestions([...bpsList, ...proxiesList])
  }, [data, loading])

  useEffect(() => {
    const getDataAsync = async () => {
      await getData({ variables: { name: `%${debouncedAccount}%` } })
    }

    if (debouncedAccount.length) {
      getDataAsync(debouncedAccount)
    }
  }, [debouncedAccount])

  const renderInputComponent = inputProps => {
    const { inputRef = () => {}, ref, classes, ...other } = inputProps
    const { hideSearchIcon, isFocused = true } = props

    return (
      <TextField
        fullWidth
        autoFocus={isFocused}
        InputProps={{
          inputRef: node => {
            ref(node)
            inputRef(node)
          },
          disableunderline: 'true',
          fullWidth: true,
          startAdornment: hideSearchIcon ? null : (
            <InputAdornment className={classes.inputAdornment} position='start'>
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          )
        }}
        classes={{
          root: classes.root
        }}
        {...other}
      />
    )
  }

  const renderSuggestion = ({ name: suggestion }, { query, isHighlighted }) => (
    <MenuItem selected={isHighlighted} component='div'>
      <Highlight
        search={query}
        matchElement='span'
        matchClass={classes.highlightMatch}
      >
        {suggestion}
      </Highlight>
    </MenuItem>
  )

  const getSuggestionValue = ({ name }) => name

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSearchText(value)
  }

  const handleSuggestionsClearRequested = () => {
    setSearchText('')
    setSuggestions([])
  }

  const handleSelected = (event, { newValue }) => {
    setSearchText(newValue)
  }

  const handleSelectedSuggestion = (e, { suggestion }) => {
    history.push(`${suggestion.path}${suggestion.owner}`)
    props.onItemSelected && props.onItemSelected()
  }

  return (
    <div className={classes.root}>
      <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={suggestions}
        onSuggestionSelected={handleSelectedSuggestion}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => handleSuggestionsClearRequested()}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: t('searchAutocomplete'),
          value: searchText,
          onChange: handleSelected
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
    </div>
  )
}

InputAutocomplete.propTypes = {
  hideSearchIcon: PropTypes.bool,
  onItemSelected: PropTypes.func,
  isFocused: PropTypes.bool,
  name: PropTypes.any
}

InputAutocomplete.defaultProps = {
  hideSearchIcon: false
}

export default InputAutocomplete
