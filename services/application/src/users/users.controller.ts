import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedUserRequest, UpdatedUserRequest } from './users.dto';
import { MessagePattern } from '@nestjs/microservices';
import { WithoutPassword, HashPassword } from './decorator/users.decorator';
import { SERVICE_CMD } from '../global';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HashPassword()
  @MessagePattern({ cmd: SERVICE_CMD.CREATE_USER })
  public async createUser(@Body(ValidationPipe) user: CreatedUserRequest) {
    const res = this.usersService.createUser(user);
    return res;
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USER })
  @WithoutPassword()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USERS })
  public getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
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
