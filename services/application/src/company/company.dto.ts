import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  creationDate: Date;

  @IsString()
  address: string;

  website: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  founder: any;

  createdAt: Date;

  updatedAt: Date;

  siret: number;

  @IsNotEmpty()
  size: any;

  @IsNotEmpty()
  revenue: any;

  @IsNotEmpty()
  sector: any;

  jobAds: any;
}
