import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyRevenueOptionRequest {
  @IsString()
  @IsNotEmpty()
  revenue: string;
}

export class UpdateCompanyRevenueOptionRequest extends CreateCompanyRevenueOptionRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetCompanyRevenueOptionsByIdRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}
