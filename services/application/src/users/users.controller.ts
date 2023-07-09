import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedUserRequest, UpdatedUserRequest } from './users.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HashPassword, CleanResponseUser } from './decorator/users.decorator';
import { Roles, SERVICE_CMD } from '../global';
import { UserRole } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_USER })
  @HashPassword()
  public async createUser(@Payload(ValidationPipe) user: CreatedUserRequest) {
    return this.usersService.createUser(user);
  }

  @MessagePattern({ cmd: SERVICE_CMD.VERIFY_ACCOUNT })
  public async verifyUser(@Payload(ValidationPipe) token: string) {
    return this.usersService.verifyUser(token);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_SELF_USER })
  @CleanResponseUser()
  public getSelfUser(@Payload(ValidationPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USERS })
  @Roles(UserRole.ROLE_ADMIN)
  @CleanResponseUser()
  public getUsers() {
    return this.usersService.getUsers();
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USER })
  @CleanResponseUser()
  public getUser(@Payload(ValidationPipe) uuid: string) {
    return this.usersService.getUser(uuid);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_USER_BY_EMAIL })
  public getUserByEmail(@Payload(ValidationPipe) email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_USER })
  public updateUser(
    @Param('user', ParseUUIDPipe) user: string,
    @Payload(ValidationPipe) payload: UpdatedUserRequest
  ) {
    return this.usersService.updateUser(user, payload);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_TOKEN_USER })
  public updateTokenUser(@Payload(ValidationPipe) email: string) {
    return this.usersService.updateTokenUser(email);
  }

  @MessagePattern({ cmd: SERVICE_CMD.DELETE_USER })
  public async deleteUser(@Body(ValidationPipe) uuid: string) {
    return this.usersService.deleteUser(uuid);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_MY_JOBS })
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public getMyJobs(@Payload(ValidationPipe) payload: any) {
    return this.usersService.getMyJobs(payload.tokenUser);
  }
}
