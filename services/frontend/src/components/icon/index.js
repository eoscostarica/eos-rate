import React from 'react'
import PropTypes from 'prop-types'

const src = {
  menu: require('./menu.svg'),
  community: require('./community.svg'),
  infrastructure: require('./infrastructure.svg'),
  development: require('./development.svg'),
  transparency: require('./transparency.svg'),
  trustiness: require('./trustiness.svg')
}

const Icon = ({ name, useImage, size, ...props }) => {
  if (useImage) {
    return (
      <img
        alt={name}
        src={src[name]}
        style={{
          height: size,
          width: size
        }}
        {...props}
      />
    )
  }

  return (
    <button
      style={{
        alignItems: 'center',
        background: 'none',
        border: 0,
        display: 'flex',
        height: size,
        justifyContent: 'center',
        padding: 0,
        width: size
      }}
      {...props}
    >
      <img
        alt={name}
        src={src[name]}
        style={{
          height: size,
          width: size
        }}
      />
    </button>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  useImage: PropTypes.bool
}

Icon.defaultProps = {
  size: 16,
  useImage: false
}

export default Icon
