import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(201)
  public register(@Body(ValidationPipe) data: CreatedUserRequest) {
    return this.authService.register(data);
  }

  // @Post()
  // public async userCreated(user: CreatedUserRequest) {
  //   console.log('user created', user);
  //   return user;
  // }
}
