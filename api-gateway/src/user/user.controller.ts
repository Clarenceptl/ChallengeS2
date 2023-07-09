import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { SuccessResponse, ErrorModel } from '../global';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my-jobs')
  @HttpCode(200)
  public getMyJobs(@Req() req: any) {
    const tokenUser = req?.user ?? null;
    return this.userService.getMyJobs(tokenUser);
  }
  @Get('/getSelf')
  public getSelfUser(@Req() req: any) {
    return this.userService.getSelfUser(req?.user?.id ?? null);
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

  @Patch(':uuid')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: SuccessResponse,
    description: 'Update user data'
  })
  @ApiBadRequestResponse({ type: ErrorModel, description: 'Bad request' })
  public updateUser(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Req() req: any,
    @Body() payload: any
  ) {
    const tokenUser = req?.user ?? null;
    return this.userService.updateUser(uuid, payload, tokenUser);
  }
}
