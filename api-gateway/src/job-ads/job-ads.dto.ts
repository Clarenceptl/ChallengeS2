import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobAdsRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  contractType: any;

  @IsNotEmpty()
  salary: number;

  company: any;

  createdAt?: Date;

  updatedAt?: Date;

  applicants: any;
}
