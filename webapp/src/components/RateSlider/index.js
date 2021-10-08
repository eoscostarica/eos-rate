import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

const RateSlider = styled(Slider)({
  color: '#443f56',
  height: 2,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    width: 15,
    height: 15,
    backgroundColor: '#443f56',
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
    height: 4,
    opacity: 0.5,
    backgroundColor: '#9e9e9e'
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#9e9e9e',
    height: 16,
    width: 2,
    marginTop: 0
  },
  '& .MuiSlider-markActive': {
    opacity: 1,
    backgroundColor: 'currentColor'
  }
})

export default RateSlider
