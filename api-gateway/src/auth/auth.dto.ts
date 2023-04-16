import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword
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
