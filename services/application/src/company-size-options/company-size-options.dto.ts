import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CompanyDto } from '../company/company.dto';
import e from 'express';

export class CompanySizeOptionsDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  companies: CompanyDto[];
}

export class CreateCompanySizeOptionRequest {
  @IsString()
  @IsNotEmpty()
  size: string;
}

export class UpdateCompanySizeOptionRequest extends CreateCompanySizeOptionRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class GetCompanySizeOptionsByIdRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}
