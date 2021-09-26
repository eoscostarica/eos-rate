import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

const RateSlider = styled(Slider)({
  color: '#597a81',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    width: 15,
    height: 15,
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
  '& .MuiSlider-valueLabel': {
    left: 'auto',
    top: 0,
    background: 'transparent',
    '& *': {
      background: 'transparent',
      color: '#000',
      fontSize: 12,
      fontWeight: '400'
    }
  },
  '& .MuiSlider-track': {
    height: 0
  },
  '& .MuiSlider-rail': {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#010318'
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#010318',
    height: 8,
    width: 1,
    marginTop: 0
  },
  '& .MuiSlider-markActive': {
    opacity: 1,
    backgroundColor: 'currentColor'
  }
})

export default RateSlider
