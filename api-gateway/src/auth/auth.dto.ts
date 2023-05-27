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

  @IsString()
  @IsDefined()
  firstname: string;

  @IsString()
  @IsDefined()
  lastname: string;

  @IsString()
  @IsDefined()
  birthdate: string;
}

export class LoginRequest {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}

export class VerifyAccountRequest {
  @IsString()
  @IsDefined()
  token: string;
}
