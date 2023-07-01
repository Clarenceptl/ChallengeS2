import { IsNotEmpty, IsString } from 'class-validator';
import { CompanyDto } from '../company/company.dto';
import { User } from 'src/users/users.entity';

export class CompanySizeOptionsDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  companies: CompanyDto[];
}

export class CreateCompanySizeOptionRequest {
  @IsNotEmpty()
  tokenUser: User | null;

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
