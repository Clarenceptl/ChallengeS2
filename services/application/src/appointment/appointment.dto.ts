import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AppointmentDto {
  candidate: any;

  job: any;

  time: Date;

  @IsBoolean()
  accepted: boolean;
}

export class CreateAppointmentRequest {
  @IsNotEmpty()
  @IsString()
  candidateId: string;

  @IsNotEmpty()
  @IsString()
  jobAdId: string;

  @IsNotEmpty()
  @IsString()
  time: Date;

  @IsOptional()
  accepted?: boolean;
}
