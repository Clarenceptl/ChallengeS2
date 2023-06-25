import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
export class AppointmentDto {
  candidate: any;

  job: any;

  time: Date;

  @IsBoolean()
  accepted: boolean;
}
