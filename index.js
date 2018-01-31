'use strict'

module.exports = function copyOwn (from, to) {
  for (const key of Reflect.ownKeys(from)) {
    Object.defineProperty(to, key, Object.getOwnPropertyDescriptor(from, key))
  }
  return to
}
