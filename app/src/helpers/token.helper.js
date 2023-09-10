import { now } from './date.helper'
import jwtDecode from 'jwt-decode'
import { checkDateForRefreshToken } from '@/helpers'
import { AuthService } from '@/services'

const checkToken = (token) => {
  if (!token) return false
  const accessToken = jwtDecode(token)
  const { exp } = accessToken

  if (!exp) return false
  if (exp < now.unix()) {
    return false
  }
  return exp
}

export const clearTokens = () => {
  if (localStorage.getItem('bearer-token')) {
    localStorage.removeItem('bearer-token')
  }
  if (localStorage.getItem('refresh-token')) {
    localStorage.removeItem('refresh-token')
  }
}

export const isConnected = async () => {
  const token = localStorage.getItem('bearer-token')
  const refreshToken = localStorage.getItem('refresh-token')
  const exp = checkToken(token)
  if (!exp) {
    clearTokens()
    return false
  }

  const expRefresToken = checkToken(refreshToken)
  if (!expRefresToken) return true
  const res = checkDateForRefreshToken(exp)
  if (!res) return true

  const responseService = await AuthService.refreshToken(refreshToken)
  if (!responseService.success) return false
  localStorage.setItem('bearer-token', responseService.data.token)
  localStorage.setItem('refresh-token', responseService.data.refreshToken)

  return true
}
