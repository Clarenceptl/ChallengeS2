import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import {
  CreatedUserRequest,
  UpdatedUserRequest,
  SendEmailRequest
} from './users.dto';
import { SERVICE_CMD, SERVICE_NAME } from 'src/global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { createRandToken } from 'src/helpers';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(SERVICE_NAME.MAILING) private readonly mailingService: ClientProxy
  ) {}

  public async createUser(user: CreatedUserRequest) {
    // generate token
    const token = createRandToken();
    const userWithToken = { ...user, token };

    try {
      const createUser = this.userRepository.create(userWithToken);
      await this.userRepository.save(createUser);
    } catch (error) {
      throw new RpcException('Email already exist');
    }
    const dataEmail: SendEmailRequest = {
      email: user.email,
      token,
      firstname: user.firstname
    };
    console.log('envoi email');
    const res = await lastValueFrom(
      this.mailingService.emit<SendEmailRequest>(
        SERVICE_CMD.GET_REGISTER_MAIL,
        dataEmail
      )
    );

    console.log('ress email', res);

    return { success: true, message: 'User created' };
  }

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async updateUser(id: string, updatedUser: UpdatedUserRequest) {
    return await this.userRepository.update({ id }, updatedUser);
  }

  public async deleteUser(id: string) {
    await this.userRepository.delete({ id });
    return { success: true, message: 'User delete' };
  }
}
