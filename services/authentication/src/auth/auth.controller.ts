import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_CMD } from '../enum';
import { LoginRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: SERVICE_CMD.REGISTER_USER })
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    this.authService.login(loginRequest);
  }
}
