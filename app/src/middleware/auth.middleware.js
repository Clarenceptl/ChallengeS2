import { isConnected } from '../helpers'
import { useUsersStore } from '../stores/users.store'

export const isLogged = async (context) => {
  const { next } = context
  const res = await isConnected()

  if (!res) {
    return next({
      name: 'Login'
    })
  }
  await useUsersStore().loadData()
  return next()
}

export const isNotLogged = async (context) => {
  const { next } = context
  const res = await isConnected()
  if (res) {
    return next({
      name: 'Home'
    })
  }
  return next()
}
