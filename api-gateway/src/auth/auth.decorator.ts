import {
  ExecutionContext,
  SetMetadata,
  UseGuards,
  createParamDecorator,
  BadRequestException
} from '@nestjs/common';
// import { UserRole } from 'src/users/users.enum'; 
import { AuthGuard } from '../global';
import { Request } from 'express';

// export const Roles = (...roles: UserRole[]) => {
//   return SetMetadata('roles', roles);
// };

export const Authenticated = () => {
  return UseGuards(AuthGuard);
};
