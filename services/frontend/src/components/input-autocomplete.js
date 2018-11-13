import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Redux } from 'redux-render'
import Highlight from 'react-highlighter'
import Autosuggest from 'react-autosuggest'
import filterObjects from 'filter-objects'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import store from 'store'

const { dispatch } = store

const style = theme => ({
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
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
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
    margin: '5px 25px'
  },
  searchIcon: {
    fill: 'white'
  }
})

class InputAutocomplete extends PureComponent {
  state = {
    selectedBlockProducer: '',
    suggestions: []
  }

  componentDidMount () {
    dispatch.blockProducers.getBPs()
  }

  renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node)
            inputRef(node)
          },
          disableUnderline: true,
          fullWidth: true,
          startAdornment: (
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

  renderSuggestion = (
    { org: { candidate_name: suggestion } },
    { query, isHighlighted }
  ) => (
    <MenuItem selected={isHighlighted} component='div'>
      <Highlight
        search={query}
        matchElement='span'
        matchClass={this.props.classes.highlightMatch}
      >
        {suggestion}
      </Highlight>
    </MenuItem>
  )

  getSuggestions = (list, value) =>
    filterObjects.filter(
      {
        org: {
          candidate_name: new RegExp(`${value.trim()}`, 'gi')
        }
      },
      list
    )

  getSuggestionValue = ({ org: { candidate_name: name } }) => name

  handleSuggestionsFetchRequested = list => ({ value }) =>
    this.setState({
      suggestions: this.getSuggestions(list, value)
    })

  handleSuggestionsClearRequested = dispatch => () => {
    this.setState(
      {
        suggestions: []
      },
      () => {
        if (this.state.selectedBlockProducer) {
          dispatch.blockProducers.applyFilter({
            org: {
              candidate_name: this.state.selectedBlockProducer
            }
          })
        } else {
          dispatch.blockProducers.clearFilters()
        }
      }
    )
  }

  handleSelectedBlockProducer = dispatch => (event, { newValue }) => {
    this.setState({
      selectedBlockProducer: newValue
    })
  }

  render () {
    const { classes, t } = this.props

    return (
      <Redux
        selector={state => ({
          list: state.blockProducers.list
        })}
      >
        {({ list }, dispatch) => (
          <div className={classes.root}>
            <Autosuggest
              renderInputComponent={this.renderInputComponent}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={event => {
                this.handleSuggestionsFetchRequested(list)(event)
              }}
              onSuggestionsClearRequested={() =>
                this.handleSuggestionsClearRequested(dispatch)()
              }
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={{
                classes,
                placeholder: t('searchAutocomplete'),
                value: this.state.selectedBlockProducer,
                onChange: this.handleSelectedBlockProducer(dispatch)
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
        )}
      </Redux>
    )
  }
}

InputAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default withStyles(style)(translate('translations')(InputAutocomplete))
