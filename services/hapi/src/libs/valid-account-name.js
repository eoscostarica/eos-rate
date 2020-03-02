'use strict'

const isValidAccountName = name => {
  console.log(name.length)
  if (!name) return false
  if (typeof name !== 'string') return false
  if (name.length > 12) return false
  if (!/[a-z]/.test(name[0])) return false

  return !/[^abcdefghijklmnopqrstuvwxyz12345.]/.test(name)
}

module.exports = isValidAccountName
