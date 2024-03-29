import { IsNotEmpty, IsString } from 'class-validator';

export class GetCompanySectorOptionsByIdRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateCompanySectorOptionRequest {
  @IsString()
  @IsNotEmpty()
  sector: string;
}

export class UpdateCompanySectorOptionRequest extends CreateCompanySectorOptionRequest {
  @IsString()
  @IsNotEmpty()
  id: string;
}
