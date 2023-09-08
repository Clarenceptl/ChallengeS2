import { useUsersStore } from '../stores/users.store'

export const isNotSimpleUser = (context) => {
  const { next } = context
  if (useUsersStore().isUser) {
    return next({
      name: 'Home'
    })
  }
  return next()
}

export const isSimpleUser = (context) => {
  const { next } = context
  if (!useUsersStore().isUser) {
    return next({
      name: 'Home'
    })
  }
  return next()
}

export const isAdmin = (context) => {
  const { next } = context
  if (!useUsersStore().isAdmin) {
    return next({
      name: 'Home'
    })
  }
  return next()
}

export const isEmployer = (context) => {
  const { next } = context
  if (!useUsersStore().isEmployer) {
    return next({
      name: 'Home'
    })
  }
  return next()
}
