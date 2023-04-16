import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword,
  IsOptional
} from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  confirmPassword: string;
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
