import { IsNotEmpty, IsString } from 'class-validator';

export class JobAdsDto {
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

  @IsNotEmpty()
  company: any;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  applicants: any;
}
