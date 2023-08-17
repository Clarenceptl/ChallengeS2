import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SERVICE_CMD } from './global';
import { RegisterMailRequest, ResetPasswordMailRequest } from './models/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(SERVICE_CMD.GET_REGISTER_MAIL)
  public async register(data: RegisterMailRequest): Promise<void> {
    await this.appService.register(data);
  }

  @EventPattern(SERVICE_CMD.SEND_EMAIL_RESET_PASSWORD)
  public async sendMailResetPassword(
    @Payload() data: ResetPasswordMailRequest
  ): Promise<void> {
    await this.appService.resetPasswordMail(data);
  }
}
