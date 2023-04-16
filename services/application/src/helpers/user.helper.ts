import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';

export const removePassword = (user: User): User => {
  delete user.password;
  return user;
};

export const encryptPassword = (pwd: string): string => {
  return bcrypt.hashSync(pwd, 10);
};
