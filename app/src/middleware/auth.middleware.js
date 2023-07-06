import { checkDateForRefreshToken, checkToken } from '@/helpers'
import { AuthService } from '@/services'

export const isConnected = async () => {
  const token = localStorage.getItem('bearer-token')
  const refreshToken = localStorage.getItem('refresh-token')
  const exp = checkToken(token)
  if (!exp) return false

  if (!refreshToken) return false
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
