import { now } from './date.helper'
import jwtDecode from 'jwt-decode'

export const clearTokens = () => {
  if (localStorage.getItem('bearer-token')) {
    localStorage.removeItem('bearer-token')
  }
  if (localStorage.getItem('refresh-token')) {
    localStorage.removeItem('refresh-token')
  }
}

export const checkToken = (token) => {
  if (!token) return false
  const accessToken = jwtDecode(token)
  const { exp } = accessToken

  if (!exp) return false
  if (exp < now.unix()) {
    return false
  }
  return exp
}
