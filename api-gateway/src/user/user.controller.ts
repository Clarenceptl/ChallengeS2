import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SuccessResponse, ErrorModel } from '../global';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponse,
    description: 'Get user data'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getUser(uuid);
  }

  @Get('/getSelf')
  public getSelfUser() {
    return this.userService.getSelfUser();
  }
}
