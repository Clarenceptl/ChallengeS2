import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
export const now = dayjs()
dayjs.extend(relativeTime)

export const formatDateToApi = (date, separator = '-') => {
  if (!date) return null
  const [year, month, day] = date.split(separator)
  return `${day}/${month}/${year}`
}

export const formatDateToInput = (date, separator = '/') => {
  if (!date) return null
  const [year, month, day] = date.split(separator)
  return `${day}-${month}-${year}`
}

export const checkDateForRefreshToken = (dateMs) => {
  const nowMs = now.unix()
  const tenMinutesBeforeExp = dayjs.unix(dateMs).subtract(10, 'm').unix()

  if (!dateMs) return false
  if (nowMs >= tenMinutesBeforeExp && nowMs < dateMs) {
    return true
  }

  return false
}

export const formatDateAppointment = (date) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  return `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
