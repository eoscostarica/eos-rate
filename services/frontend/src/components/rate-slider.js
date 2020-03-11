import { withStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'

const RateSlider = withStyles({
  root: {
    color: '#597a81',
    height: 2,
    padding: '15px 0'
  },
  thumb: {
    backgroundColor: '#597a81',
    boxShadow:
      '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
    '&:focus,&:hover,&$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'
      }
    }
  },
  active: {},
  valueLabel: {
    left: 'auto',
    top: -15,
    '& *': {
      background: 'transparent',
      color: '#000'
    }
  },
  track: {
    height: 2
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#010318'
  },
  mark: {
    backgroundColor: '#010318',
    height: 8,
    width: 1,
    marginTop: -3
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor'
  }
})(Slider)

export default RateSlider
