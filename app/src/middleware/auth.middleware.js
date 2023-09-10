import { isConnected } from '../helpers'
import { useUsersStore, useToastStore } from '../stores'

export const isLogged = async (context) => {
  const { next } = context
  const res = await isConnected()

  if (!res) {
    useToastStore().createToast({
      message: 'You must be logged in to access this page',
      type: 'error'
    })
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
    useToastStore().createToast({
      message: 'You must not be logged in to access this page',
      type: 'error'
    })
    return next({
      name: 'Home'
    })
  }
  return next()
}
