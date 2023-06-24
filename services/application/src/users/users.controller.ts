import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Req,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedUserRequest, UpdatedUserRequest } from './users.dto';
import { MessagePattern } from '@nestjs/microservices';
import { HashPassword, CleanResponseUser } from './decorator/users.decorator';
import { SERVICE_CMD } from '../global';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_USER })
  @HashPassword()
  public async createUser(@Body(ValidationPipe) user: CreatedUserRequest) {
    return this.usersService.createUser(user);
  }

  @MessagePattern({ cmd: SERVICE_CMD.VERIFY_ACCOUNT })
  public async verifyUser(@Body(ValidationPipe) token: string) {
    return this.usersService.verifyUser(token);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USERS })
  @CleanResponseUser()
  public getSelfUser(@Req() req: any) {
    const { id } = req.user;
    return this.usersService.getUser(id ?? '');
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USERS })
  @CleanResponseUser()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USER })
  @CleanResponseUser()
  public getUser(@Body(ValidationPipe) uuid: string) {
    return this.usersService.getUser(uuid);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USER_BY_EMAIL })
  public getUserByEmail(@Body(ValidationPipe) email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_USER })
  public updateUser(
    @Param('user', ParseUUIDPipe) user: string,
    @Body(ValidationPipe) body: UpdatedUserRequest
  ) {
    return this.usersService.updateUser(user, body);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_USER })
  public async deleteUser(@Body(ValidationPipe) uuid: string) {
    return this.usersService.deleteUser(uuid);
  }
}
