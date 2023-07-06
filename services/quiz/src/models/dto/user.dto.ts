export enum UserRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_EMPLOYEUR = 'ROLE_EMPLOYEUR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export interface User {
  id: string;
  roles: UserRole[];
}
