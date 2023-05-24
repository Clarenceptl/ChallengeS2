import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreatedUserRequest,
  LoginRequest,
  VerifyAccountRequest
} from './auth.dto';
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
  @HttpCode(200)
  public login(@Body(ValidationPipe) data: LoginRequest) {
    return this.authService.login(data);
  }

  @Post('verify-account')
  @isPublic()
  @HttpCode(200)
  public verifyAccount(@Body(ValidationPipe) data: VerifyAccountRequest) {
    if (!data.token) throw new Error('Token is required');
    return this.authService.verifyAccount(data.token);
  }
}
