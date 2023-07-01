import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyRevenueOptionRequest {
  @IsString()
  @IsNotEmpty()
  revenue: string;
}
