import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from '@reach/router'
import Highlight from 'react-highlighter'
import Autosuggest from 'react-autosuggest'
import filterObjects from 'filter-objects'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

import withT from 'components/with-t'

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
})

class InputAutocomplete extends PureComponent {
  state = {
    selectedBlockProducer: '',
    suggestions: []
  }

  componentDidMount () {
    this.props.getBPs()
  }

  renderInputComponent = inputProps => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps
    const { hideSearchIcon, isFocused } = this.props

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

  renderSuggestion = (
    {
      bpjson: {
        org: { candidate_name: suggestion }
      }
    },
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

  getSuggestions = (list, value) => {
    return filterObjects.filter(
      {
        bpjson: {
          org: {
            candidate_name: new RegExp(`${value.trim()}`, 'gi')
          }
        }
      },
      list
    )
  }

  getSuggestionValue = ({
    bpjson: {
      org: { candidate_name: name }
    }
  }) => name

  handleSuggestionsFetchRequested = list => ({ value }) =>
    this.setState({
      suggestions: this.getSuggestions(list, value)
    })

  handleSuggestionsClearRequested = () =>
    this.setState({
      selectedBlockProducer: '',
      suggestions: []
    })

  handleSelectedBlockProducer = (event, { newValue }) => {
    this.setState({
      selectedBlockProducer: newValue
    })
  }

  handleSelectedSuggestion = (event, { suggestion }) => {
    navigate(`/block-producers/${suggestion.bpjson.producer_account_name}`)
    this.props.onItemSelected && this.props.onItemSelected()
  }

  render () {
    const { classes, list, t } = this.props

    return (
      <div className={classes.root}>
        <Autosuggest
          renderInputComponent={this.renderInputComponent}
          suggestions={this.state.suggestions}
          onSuggestionSelected={this.handleSelectedSuggestion}
          onSuggestionsFetchRequested={event => {
            this.handleSuggestionsFetchRequested(list)(event)
          }}
          onSuggestionsClearRequested={() =>
            this.handleSuggestionsClearRequested()}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={{
            classes,
            placeholder: t('searchAutocomplete'),
            value: this.state.selectedBlockProducer,
            onChange: this.handleSelectedBlockProducer
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
}

InputAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  getBPs: PropTypes.func.isRequired,
  hideSearchIcon: PropTypes.bool,
  list: PropTypes.array,
  onItemSelected: PropTypes.func,
  isFocused: PropTypes.bool
}

InputAutocomplete.defaultProps = {
  hideSearchIcon: false
}

const mapStatetoProps = state => ({
  list: state.blockProducers.list
})

const mapDispatchToProps = ({ blockProducers: { getBPs } }) => ({
  getBPs
})

export default withStyles(style)(
  connect(
    mapStatetoProps,
    mapDispatchToProps
  )(withT(InputAutocomplete))
)
