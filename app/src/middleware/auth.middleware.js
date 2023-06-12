import jwtDecode from 'jwt-decode'
const now = Date.now() / 1000

export const isConnected = () => {
  const token = localStorage.getItem('bearer-token')
  if (!token) return false

  const accessToken = jwtDecode(token)
  const { exp } = accessToken

  if (!exp) return false
  if (exp < now) {
    localStorage.removeItem('bearer-token')
    return false
  }
  return true
}
