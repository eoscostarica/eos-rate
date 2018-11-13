import React from 'react'
import PropTypes from 'prop-types'

let randomId = 0
const Video = ({ src, ...pros }) => (
  <iframe
    title={'unique' + randomId++}
    width='100%'
    height='100%'
    src={src}
    frameBorder='0'
    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
    allowFullScreen
    {...pros}
  />
)

Video.propTypes = {
  src: PropTypes.string.required
}

export default Video
