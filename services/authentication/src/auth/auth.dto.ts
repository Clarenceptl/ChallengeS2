import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword,
  MinLength
} from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @IsStrongPassword()
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
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
