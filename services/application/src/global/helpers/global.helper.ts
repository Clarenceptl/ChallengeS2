import { User, UserRole } from '../../users/users.entity';

export const checkRole = (
  userRoles: UserRole[],
  roles: UserRole[]
): boolean => {
  for (const role of roles) {
    if (userRoles.includes(role)) {
      return true;
    }
  }
  return false;
};

export const checkSelfUpdate = (user: User, params: any): boolean => {
  for (const key in params) {
    if (user[key] === params[key]) {
      return true;
    }
  }
  return false;
};
