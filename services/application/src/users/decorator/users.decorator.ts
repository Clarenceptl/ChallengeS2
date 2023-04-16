import { UseInterceptors, UseGuards } from '@nestjs/common';
import { RemovePassword } from './users.interceptor';
import { HashPasswordGuard } from './users.guard';

export const WithoutPassword = () => UseInterceptors(RemovePassword);
export const HashPassword = () => UseGuards(HashPasswordGuard);
