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

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HashPassword()
  @MessagePattern({ cmd: 'register-user' })
  public async createUser(@Body(ValidationPipe) user: CreatedUserRequest) {
    const res = this.usersService.createUser(user);
    return res;
  }

  @MessagePattern({ cmd: 'get-users' })
  @WithoutPassword()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern({ cmd: 'get-user' })
  public getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.usersService.getUser(uuid);
  }

  @MessagePattern({ cmd: 'update-user' })
  public updateUser(
    @Param('user', ParseUUIDPipe) user: string,
    @Body(ValidationPipe) body: UpdatedUserRequest
  ) {
    return this.usersService.updateUser(user, body);
  }

  @MessagePattern({ cmd: 'delete-user' })
  public async deleteUser(@Body(ValidationPipe) uuid: string) {
    return this.usersService.deleteUser(uuid);
  }
}
