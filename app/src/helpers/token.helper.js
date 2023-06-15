import { now } from './date.helper'
import jwtDecode from 'jwt-decode'

export const clearTokens = () => {
  localStorage.removeItem('bearer-token')
  localStorage.removeItem('refresh-token')
}

export const checkToken = (token) => {
  if (!token) return false
  const accessToken = jwtDecode(token)
  const { exp } = accessToken

  if (!exp) return false
  if (exp < now.unix()) {
    clearTokens()
    return false
  }
  return exp
}
