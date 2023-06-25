import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Req
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SuccessResponse, ErrorModel } from '../global';

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getSelf')
  public getSelfUser(@Req() req: any) {
    const { id } = req?.user ?? null;
    return this.userService.getSelfUser(id);
  }

  @Get()
  public getUsers(@Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.userService.getUsers(tokenUser);
  }

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
}
