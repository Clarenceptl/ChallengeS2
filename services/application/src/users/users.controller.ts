import { Body, Controller, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatedUserRequest, UpdatePassword } from './users.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HashPassword, CleanResponseUser } from './decorator/users.decorator';
import { Roles, SERVICE_CMD } from '../global';
import { User, UserRole } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_USER })
  @HashPassword()
  public async createUser(@Payload(ValidationPipe) user: CreatedUserRequest) {
    console.log('register user app service');
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
  @CleanResponseUser()
  public updateUser(@Payload(ValidationPipe) payload: any) {
    const { id, data, tokenUser } = payload;
    return this.usersService.updateUser(id, data, tokenUser);
  }

  @MessagePattern({ cmd: SERVICE_CMD.RESET_PASSWORD })
  @HashPassword()
  public resetPassword(@Payload(ValidationPipe) payload: UpdatePassword) {
    return this.usersService.updateUserByToken(payload);
  }

  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_TOKEN_USER })
  @CleanResponseUser()
  public updateTokenUser(@Payload(ValidationPipe) email: string) {
    return this.usersService.updateTokenUser(email);
  }

  @Roles(UserRole.ROLE_ADMIN)
  @MessagePattern({ cmd: SERVICE_CMD.DELETE_USER })
  public async deleteUser(
    @Body(ValidationPipe) { id, tokenUser }: { id: string; tokenUser: User }
  ) {
    return this.usersService.deleteUser(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_MY_JOBS })
  @Roles(UserRole.ROLE_EMPLOYEUR)
  public getMyJobs(@Payload(ValidationPipe) payload: any) {
    return this.usersService.getMyJobs(payload.tokenUser);
  }
}
