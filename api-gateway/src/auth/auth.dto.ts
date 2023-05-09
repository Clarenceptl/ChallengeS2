import { IsString, IsDefined } from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;

  @IsString()
  @IsDefined()
  confirmPassword: string;
}
