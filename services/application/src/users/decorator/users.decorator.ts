import { UseInterceptors, UseGuards } from '@nestjs/common';
import { CleanResponseUserInterceptor } from './users.interceptor';
import { HashPasswordGuard } from './users.guard';

export const CleanResponseUser = () =>
  UseInterceptors(CleanResponseUserInterceptor);
export const HashPassword = () => UseGuards(HashPasswordGuard);
