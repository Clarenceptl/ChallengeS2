import {
  IsString,
  IsDefined,
  IsEmail,
  IsStrongPassword,
  MinLength
} from 'class-validator';

enum UserRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_EMPLOYEUR = 'ROLE_EMPLOYEUR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

export class User {
  id: string;
  email: string;
  password: string;
  roles: UserRole[];
  firstname: string;
  lastname: string;
  birthdate: string;
  isVerified: boolean;
  premium: boolean;
  token: string;
  createdAt: string;
}

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

export class ResetPassword {
  @IsString()
  @IsDefined()
  token: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsDefined()
  @IsStrongPassword()
  confirmPassword: string;
}
