import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import Highlight from 'react-highlighter'
import Autosuggest from 'react-autosuggest'
import filterObjects from 'filter-objects'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import _get from 'lodash.get'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  input: {
    color: 'white'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: '-24px',
    right: 0,
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      left: 0,
      width: 'auto'
    }
  },
  highlightMatch: {
    fontWeight: 600
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  inputAdornment: {
    margin: '5px 25px 5px 0',
    [theme.breakpoints.up('md')]: {
      margin: '5px 25px'
    }
  },
  searchIcon: {
    fill: 'white'
  }
}))

const InputAutocomplete = ({ getBPs, getProxies, list, proxies, ...props }) => {
  const classes = useStyles()
  const { t } = useTranslation('translations')
  const [suggestions, setSuggestions] = useState([])
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      await getBPs()
      await getProxies()
    }

    getData()
  }, [])

  useEffect(() => {
    const bpsList = (list || []).map(bp => {
      const name = _get(bp, 'bpjson.org.candidate_name', bp.owner)

      return { name, owner: bp.owner, path: '/block-producers/' }
    })
    const proxiesList = (proxies || []).map(proxy => {
      const name = _get(proxy, 'name', proxy.owner)

      return { name, owner: proxy.owner, path: '/proxies/' }
    })

    setData([...bpsList, ...proxiesList])
  }, [list, proxies])

  const renderInputComponent = inputProps => {
    const { inputRef = () => {}, ref, ...other } = inputProps
    const { hideSearchIcon, isFocused } = props

    return (
      <TextField
        fullWidth
        autoFocus={isFocused}
        InputProps={{
          inputRef: node => {
            ref(node)
            inputRef(node)
          },
          disableUnderline: true,
          fullWidth: true,
          startAdornment: hideSearchIcon ? null : (
            <InputAdornment className={classes.inputAdornment} position='start'>
              <SearchIcon className={classes.searchIcon} />
            </InputAdornment>
          ),
          classes: {
            input: classes.input
          }
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

  const getSuggestions = (list, value) => {
    return filterObjects.filter(
      {
        name: new RegExp(`${value.trim()}`, 'gi')
      },
      list
    )
  }

  const getSuggestionValue = ({ name }) => name

  const handleSuggestionsFetchRequested = list => ({ value }) =>
    setSuggestions(getSuggestions(list, value))

  const handleSuggestionsClearRequested = () => {
    setText('')
    setSuggestions([])
  }

  const handleSelected = (event, { newValue }) => {
    setText(newValue)
  }

  const handleSelectedSuggestion = (event, { suggestion }) => {
    navigate(`${suggestion.path}${suggestion.owner}`)
    props.onItemSelected && props.onItemSelected()
  }

  return (
    <div className={classes.root}>
      <Autosuggest
        renderInputComponent={renderInputComponent}
        suggestions={suggestions}
        onSuggestionSelected={handleSelectedSuggestion}
        onSuggestionsFetchRequested={event => {
          handleSuggestionsFetchRequested(data)(event)
        }}
        onSuggestionsClearRequested={() => handleSuggestionsClearRequested()}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: t('searchAutocomplete'),
          value: text,
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
  getBPs: PropTypes.func.isRequired,
  hideSearchIcon: PropTypes.bool,
  list: PropTypes.array,
  onItemSelected: PropTypes.func,
  isFocused: PropTypes.bool,
  proxies: PropTypes.array,
  getProxies: PropTypes.func,
  name: PropTypes.any
}

InputAutocomplete.defaultProps = {
  hideSearchIcon: false
}

const mapStatetoProps = state => ({
  list: state.blockProducers.list,
  proxies: state.proxies.proxies
})

const mapDispatchToProps = ({
  blockProducers: { getBPs },
  proxies: { getProxies }
}) => ({
  getBPs,
  getProxies
})

export default connect(mapStatetoProps, mapDispatchToProps)(InputAutocomplete)
