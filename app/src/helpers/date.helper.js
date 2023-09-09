import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const now = dayjs()
dayjs.extend(relativeTime)

export const formatDateFront = (date, separator = '-') => {
  if (!date) return null
  const [year, month, day] = date.split(separator)
  return `${day}/${month}/${year}`
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
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}
