import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreatedUserRequest,
  LoginRequest,
  SendEmailResetPassword,
  VerifyAccountRequest
} from './auth.dto';
import { ErrorModel, isPublic, SuccessResponse } from '../global';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
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

  @Put('verify-account')
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

  @Post('send-email-reset-password')
  @isPublic()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponse,
    description: 'The email has been send.'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public emailResetPassword(
    @Body(ValidationPipe) data: SendEmailResetPassword
  ) {
    const { email } = data;
    return this.authService.emailResetPassword(email);
  }

  @ApiBearerAuth()
  @Post('refresh-token')
  @HttpCode(200)
  public refreshToken(
    @Body(ValidationPipe) data: { refreshToken: string },
    @Req() req: Request
  ) {
    return this.authService.getRefreshToken(req, data.refreshToken);
  }
}
