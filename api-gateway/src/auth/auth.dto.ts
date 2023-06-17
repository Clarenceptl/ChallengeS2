import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';

export class CreatedUserRequest {
  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true
  })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true
  })
  password: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Confirm password of the user',
    type: String,
    required: true
  })
  confirmPassword: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Firstname of the user',
    type: String,
    required: true
  })
  firstname: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Lastname of the user',
    type: String,
    required: true
  })
  lastname: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Birthdate of the user',
    type: String,
    required: true
  })
  birthdate: string;
}

export class LoginRequest {
  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    required: true
  })
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true
  })
  password: string;
}

export class VerifyAccountRequest {
  @IsString()
  @IsDefined()
  @ApiProperty({
    description: 'Token of the user',
    type: String,
    required: true
  })
  token: string;
}
