import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserRequest } from './auth.dto';
import { isPublic } from '../global';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @isPublic()
  @HttpCode(201)
  public register(@Body(ValidationPipe) data: CreatedUserRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  @isPublic()
  @HttpCode(201)
  public login(@Body(ValidationPipe) data: CreatedUserRequest) {
    return this.authService.login(data);
  }
}
