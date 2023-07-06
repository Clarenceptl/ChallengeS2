import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanySectorOptionRequest {
  @IsString()
  @IsNotEmpty()
  sector: string;
}
