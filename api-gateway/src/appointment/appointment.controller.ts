import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  AcceptAppointmentRequest,
  CreateAppointmentRequest
} from './appointment.dto';

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

  @Get(':id')
  @HttpCode(200)
  public getAppointmentById(@Param('id') id: string, @Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.appointmentService.getAppointmentById(id, tokenUser);
  }

  @Post()
  @HttpCode(201)
  public createAppointment(
    @Body(ValidationPipe) data: CreateAppointmentRequest,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.appointmentService.createAppointment(data, tokenUser);
  }

  @Patch(':id')
  @HttpCode(200)
  public acceptAppointment(
    @Param('id') id: string,
    @Body() data: AcceptAppointmentRequest,
    @Req() req: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.appointmentService.acceptAppointment(id, data, tokenUser);
  }
}
