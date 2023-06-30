import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller({
  path: 'appointments',
  version: '1'
})
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @HttpCode(200)
  public getAppointments(@Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.appointmentService.getAppointments(tokenUser);
  }
}
