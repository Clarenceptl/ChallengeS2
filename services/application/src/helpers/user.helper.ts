import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';

export const removePassword = (user: User): User => {
  delete user.password;
  return user;
};

export const encryptPassword = (pwd: string): string => {
  return bcrypt.hashSync(pwd, 10);
};

export const createRandToken = (): string => {
  const randNb = Math.random().toString(36);
  const randomString = randNb.substring(2, randNb.length);
  return bcrypt.hashSync(randomString, 10);
};
