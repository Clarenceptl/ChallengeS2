import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanySizeOptionRequest {
  @IsString()
  @IsNotEmpty()
  size: string;
}

export class UpdateCompanySizeOptionRequest extends CreateCompanySizeOptionRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}
