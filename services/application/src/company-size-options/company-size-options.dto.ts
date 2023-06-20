import { IsNotEmpty, IsString } from 'class-validator';
import { CompanyDto } from '../company/company.dto';

export class CompanySizeOptionsDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  companies: CompanyDto[];
}
