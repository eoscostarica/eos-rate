'use strict'

const isValidAccountName = name => {
  if (
    !name ||
    typeof name !== 'string' ||
    name.length > 12 ||
    !/[a-z]/.test(name[0])
  )
    return false

  return !/[^abcdefghijklmnopqrstuvwxyz12345.]/.test(name)
}

const accountValidation = (accounts = []) => {
  const result = accounts.find(({ name }) => !isValidAccountName(name))

  if (result)
    return {
      message: `Invalid ${result.type} provided!`,
      isValidAccountName: false
    }

  return {
    message: null,
    isValidAccountName: true
  }
}

module.exports = accountValidation
