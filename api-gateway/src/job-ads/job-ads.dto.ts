import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
export class UpdateJobAdsRequest {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsOptional()
  contractType: any;

  @IsOptional()
  salary: number;
}
