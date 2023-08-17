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

export const checkSelfUpdate = (user: User | null, params: any): boolean => {
  if (!user) {
    return false;
  }
  for (const key in params) {
    if (user[key] === params[key]) {
      return true;
    }
  }
  return false;
};
