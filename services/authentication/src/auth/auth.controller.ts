import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { SERVICE_CMD } from '../enum';
import { CreatedUserRequest, LoginRequest } from './auth.dto';
import { User } from './auth.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: SERVICE_CMD.REGISTER_USER })
  public register(@Body(ValidationPipe) registerRequest: CreatedUserRequest) {
    return this.authService.register(registerRequest);
  }

  @MessagePattern({ cmd: SERVICE_CMD.LOGIN_USER })
  public login(@Body(ValidationPipe) loginRequest: LoginRequest) {
    console.log('loginRequest', loginRequest);
    return this.authService.login(loginRequest);
  }

  @MessagePattern({ cmd: SERVICE_CMD.VERIFY_ACCOUNT })
  public verifyAccount(@Body(ValidationPipe) token: string) {
    return this.authService.verifyAccount(token);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_REFRESH_TOKEN })
  public getRefreshToken(
    @Body(ValidationPipe) data: { user: User; refreshToken: string }
  ) {
    return this.authService.getRefreshToken(data);
  }
}
