import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword,
  IsOptional,
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
  firstname: string;

  @IsString()
  @IsDefined()
  lastname: string;

  @IsString()
  @IsDefined()
  birthdate: string;
}

export class UpdatedUserRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  @IsOptional()
  confirmPassword: string;
}

export interface SendEmailRequest {
  email: string;
  token: string;
  firstname: string;
}
