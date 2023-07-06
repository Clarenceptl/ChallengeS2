import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  accepted: boolean;
}

export class AcceptAppointmentRequest {
  @IsNotEmpty()
  @IsString()
  accepted: boolean;
}
