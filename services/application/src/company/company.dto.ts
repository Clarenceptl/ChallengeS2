import { IsNotEmpty, IsString } from 'class-validator';
import { CompanyRevenueOptions } from 'src/company-revenue-options/company-revenue-options.entity';
import { CompanySectorOptions } from 'src/company-sector-options/company-sector-options.entity';
import { CompanySizeOptions } from 'src/company-size-options/company-size-option.entity';
import { JobAds } from 'src/job-ads/job-ads.entity';

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
  size: CompanySizeOptions;

  @IsNotEmpty()
  revenue: CompanyRevenueOptions;

  @IsNotEmpty()
  sector: CompanySectorOptions;

  jobAds: JobAds[];
}

export class CreateCompanyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  creationDate: Date;

  @IsString()
  address: string;

  @IsString()
  website: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  founder: any;

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
