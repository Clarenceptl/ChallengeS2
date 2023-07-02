import {
  Controller,
  Post,
  HttpCode,
  Body,
  ValidationPipe
} from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { SERVICE_CMD } from './global';
import {
  ConfirmationAccount,
  RegisterMailBO,
  RegisterMailRequest
} from './models/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('mailing')
@ApiTags('mailing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(SERVICE_CMD.GET_REGISTER_MAIL)
  public async register(data: RegisterMailRequest): Promise<void> {
    await this.appService.register(data);
  }

  @EventPattern(SERVICE_CMD.GET_REGISTER_MAIL_BO)
  @Post('register-backoffice')
  @HttpCode(201)
  public async registerBackoffice(data: RegisterMailBO): Promise<void> {
    console.log('registerBackoffice', data);
    await this.appService.registerBo(data);
  }

  // @EventPattern(SERVICE_CMD.CONFIRMATION_ACCOUNT)
  @Post('confirm-account')
  @HttpCode(201)
  public async confirmationAccount(
    @Body(ValidationPipe) data: ConfirmationAccount
  ): Promise<void> {
    await this.appService.confirmation(data);
  }
}
