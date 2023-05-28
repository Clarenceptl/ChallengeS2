import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import {
  CreatedUserRequest,
  UpdatedUserRequest,
  SendEmailRequest
} from './users.dto';
import { SERVICE_CMD, SERVICE_NAME } from 'src/global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { createRandToken, encryptPassword } from 'src/helpers';
import { lastValueFrom } from 'rxjs';
import type { ErrorModel } from '../global';

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
      await this.userRepository.insert(userWithToken);
    } catch (error) {
      throw new RpcException({
        statusCode: 401,
        message: 'Email already exist'
      });
    }
    const dataEmail: SendEmailRequest = {
      email: user.email,
      token,
      firstname: user.firstname
    };

    await lastValueFrom(
      this.mailingService.emit<SendEmailRequest>(
        SERVICE_CMD.GET_REGISTER_MAIL,
        dataEmail
      )
    );

    return { success: true, message: 'User created' };
  }

  public async verifyUser(token: string) {
    const user = await this.userRepository.findOneBy({ token });
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }

    user.isVerified = true;
    user.token = null;

    await this.userRepository.save(user);
    return { success: true, message: 'User verified' };
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

  public async seed() {
    await this.userRepository.clear();
    const password: string = encryptPassword('password');
    let user = new User();
    user = Object.assign(user, {
      email: 'admin@admin.com',
      password: password,
      firstname: 'Admin',
      lastname: 'Jhon',
      birthdate: '01/01/1990',
      role: UserRole.ROLE_ADMIN,
      isVerified: true
    });

    const administrator = this.userRepository.create(user);

    user = Object.assign(user, {
      email: 'user@user.com',
      firstname: 'User',
      role: UserRole.ROLE_USER
    });

    const basicUser = this.userRepository.create(user);

    user = Object.assign(user, {
      email: 'employeur@employeur.com',
      firstname: 'Employeur',
      role: UserRole.ROLE_ADMIN
    });

    const employeur = this.userRepository.create(user);

    await this.userRepository.save([administrator, basicUser, employeur]);
  }
}
