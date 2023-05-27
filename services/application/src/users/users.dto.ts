import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  MinLength,
  IsNotEmpty
} from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
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
