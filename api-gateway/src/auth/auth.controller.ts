import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreatedUserRequest,
  LoginRequest,
  VerifyAccountRequest
} from './auth.dto';
import { ErrorModel, isPublic, SuccessResponse } from '../global';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @isPublic()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    type: SuccessResponse,
    description: 'The user has been successfully created.'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public register(@Body(ValidationPipe) data: CreatedUserRequest) {
    return this.authService.register(data);
  }

  @Post('login')
  @isPublic()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponse,
    description: 'The user has been successfully logged.'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public login(@Body(ValidationPipe) data: LoginRequest) {
    return this.authService.login(data);
  }

  @Post('verify-account')
  @isPublic()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponse,
    description: 'The email has been successfully verified.'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public verifyAccount(@Body(ValidationPipe) data: VerifyAccountRequest) {
    return this.authService.verifyAccount(data?.token);
  }
}
