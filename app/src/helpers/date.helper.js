import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const now = dayjs()
dayjs.extend(relativeTime)

export const formatDateFront = (date, separator = '-') => {
  if (!date) return null
  const [year, month, day] = date.split(separator)
  return `${day}/${month}/${year}`
}

export const formatDateBack = (date, separator = '/') => {
  if (!date) return null
  const [day, month, year] = date.split(separator)
  return `${day}`
}

export const checkDateForRefreshToken = (dateMs) => {
  const nowMs = now.unix()
  const twentyMinutesBeforeExp = dayjs.unix(dateMs).subtract(20, 'm').unix()

  if (!dateMs) return false
  if (nowMs >= twentyMinutesBeforeExp && nowMs < dateMs) {
    return true
  }

  return false
}

export const formatDateAppointment = (date) => {
  const [datePart, timePart] = date.split('T')
  const [year, month, day] = datePart.split('-')
  const [hour, minute] = timePart.split(':')
  return `${day}/${month}/${year} ${hour}:${minute}`
}
