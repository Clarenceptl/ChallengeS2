import { IsNotEmpty, IsString } from 'class-validator';

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
