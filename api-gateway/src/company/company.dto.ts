import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  creationDate: Date;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  website: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsString()
  founder: string;

  @IsString()
  @IsNotEmpty()
  siret: number;

  @IsNotEmpty()
  size: any;

  @IsNotEmpty()
  revenue: any;

  @IsNotEmpty()
  sector: any;
}

export class UpdateCompanyRequest {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsString()
  creationDate: Date;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  founder: string;

  @IsString()
  @IsOptional()
  siret: string;

  @IsOptional()
  size: any;

  @IsOptional()
  revenue: any;

  @IsOptional()
  sector: any;
}
