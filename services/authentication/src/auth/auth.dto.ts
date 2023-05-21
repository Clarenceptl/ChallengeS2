import { IsString, IsDefined, IsEmail } from 'class-validator';

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

export class LoginRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
