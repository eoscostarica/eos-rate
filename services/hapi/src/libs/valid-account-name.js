'use strict'

const isValidAccountName = name => {
  if (!name) return false
  if (typeof name !== 'string') return false
  if (name.length > name.length > 12) return false
  if (!/[a-z]/.test(name[0])) return false

  return !/[^abcdefghijklmnopqrstuvwxyz12345.]/.test(name)
}

module.exports = isValidAccountName
