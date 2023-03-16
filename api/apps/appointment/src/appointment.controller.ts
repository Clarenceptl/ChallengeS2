import { Controller, Get } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller()
export class AppointmentController {
  constructor(private readonly appoitmentService: AppointmentService) {}

  @Get()
  getHello(): string {
    return this.appoitmentService.getHello();
  }
}
