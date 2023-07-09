import { Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_CMD } from '../enum';
import { CreatedUserRequest, LoginRequest, ResetPassword } from './auth.dto';
import { User } from './auth.dto';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: SERVICE_CMD.REGISTER_USER })
  public register(
    @Payload(ValidationPipe) registerRequest: CreatedUserRequest
  ) {
    return this.authService.register(registerRequest);
  }

  @MessagePattern({ cmd: SERVICE_CMD.LOGIN_USER })
  public login(@Payload(ValidationPipe) loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @MessagePattern({ cmd: SERVICE_CMD.VERIFY_ACCOUNT })
  public verifyAccount(@Payload(ValidationPipe) token: string) {
    return this.authService.verifyAccount(token);
  }

  @MessagePattern({ cmd: SERVICE_CMD.SEND_EMAIL_RESET_PASSWORD })
  public sendEmailResetPassword(@Payload(ValidationPipe) email: string) {
    return this.authService.sendMailResetPassword(email);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_REFRESH_TOKEN })
  public getRefreshToken(
    @Payload(ValidationPipe) data: { user: User; refreshToken: string }
  ) {
    return this.authService.getRefreshToken(data);
  }

  @MessagePattern({ cmd: SERVICE_CMD.RESET_PASSWORD })
  public resetPassword(
    @Payload(ValidationPipe)
    data: ResetPassword
  ) {
    return this.authService.resetPassword(data);
  }
}
