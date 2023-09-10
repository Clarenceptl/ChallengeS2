import { statusFrontEmployeur } from '@/enums'
export const getColorStatus = (status) => {
  switch (status) {
    case statusFrontEmployeur.INIT:
      return 'grey'
    case statusFrontEmployeur.PENDING:
      return 'orange'
    case statusFrontEmployeur.ACCEPTED:
      return 'green'
    case statusFrontEmployeur.REJECTED:
      return 'red'
    default:
      return 'grey'
  }
}
