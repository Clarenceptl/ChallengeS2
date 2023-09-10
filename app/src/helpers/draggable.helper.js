import { statusFrontEmployeur } from '../enums'
export const handleMeetColumn = (dragContext) => {
  if (
    dragContext.to.id === statusFrontEmployeur.ACCEPTED ||
    dragContext.to.id === statusFrontEmployeur.REJECTED ||
    dragContext.to.id === statusFrontEmployeur.PENDING
  ) {
    return true
  }
  return false
}

export const handleAcceptedColumn = (dragContext) => {
  if (
    dragContext.to.id === statusFrontEmployeur.ACCEPTED ||
    dragContext.to.id === statusFrontEmployeur.REJECTED
  ) {
    return true
  }
  return false
}
