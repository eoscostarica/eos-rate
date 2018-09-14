import React from 'react'

const src = {
  menu: require('./menu.svg')
}

const Icon = ({ name, size = 16, ...props }) => (
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

export default Icon
