import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { SERVICE_CMD } from './global';
import { RegisterMailRequest } from './models/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(SERVICE_CMD.GET_REGISTER_MAIL)
  public async register(data: RegisterMailRequest): Promise<void> {
    console.log('register mail', data);
    await this.appService.register(data);
  }
}
