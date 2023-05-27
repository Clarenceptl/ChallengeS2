import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';
export class AppointmentDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  candidate: string;

  @IsString()
  @IsString()
  @IsDefined()
  job: string;

  time: Date;

  @IsBoolean()
  accepted: boolean;
}
