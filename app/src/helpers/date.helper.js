export const formatDateToApi = (date, separator = '-') => {
  if (!date) return null
  const [year, month, day] = date.split(separator)
  return `${day}/${month}/${year}`
}
