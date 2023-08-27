import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import {
  CreatedUserRequest,
  UpdatedUserRequest,
  SendEmailRequest,
  UpdatePassword
} from './users.dto';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { createRandToken, encryptPassword } from '../helpers';
import type { ErrorModel } from '../global';
import { JobAds } from 'src/job-ads/job-ads.entity';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(JobAds)
    private readonly jobAdsRepository: Repository<JobAds>,
    @Inject(SERVICE_NAME.MAILING) private readonly mailingService: ClientProxy
  ) {}

  public async createUser(user: CreatedUserRequest) {
    // generate token
    const token = createRandToken();
    const userWithToken = { ...user, token };
    console.log('register user app service - create token');
    try {
      console.log('register user app service - before insert');
      await this.userRepository.insert(userWithToken);
    } catch (error) {
      throw new RpcException({
        statusCode: 401,
        message: 'Email already exist'
      });
    }
    console.log('register user app service - after insert');
    const dataEmail: SendEmailRequest = {
      email: user.email,
      token,
      firstname: user.firstname
    };
    console.log('register user app service - before send email');
    this.mailingService.emit<SendEmailRequest>(
      SERVICE_CMD.GET_REGISTER_MAIL,
      dataEmail
    );
    console.log('register user app service - after send email');
    return { success: true, message: 'User created' };
  }

  public async updateTokenUser(email: string) {
    // generate token
    const token = createRandToken();
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }
    user.token = token;
    await this.userRepository.save(user);

    return { success: true, data: user };
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

  public async getUsers(): Promise<SuccessResponse> {
    const users = await this.userRepository.find();
    return {
      success: true,
      data: users
    };
  }

  public async getMyJobs(tokenUser: any) {
    let res: JobAds[];
    try {
      const userCompany = tokenUser?.company?.id;
      const jobAds = await this.jobAdsRepository.find({
        where: { company: userCompany },
        relations: ['candidatesJobAds'],
        select: {
          candidatesJobAds: {
            candidate: {
              id: true,
              email: true,
              firstname: true,
              lastname: true,
              birthdate: true
            }
          }
        },
        order: { created_at: 'DESC' }
      });
      res = jobAds;
    } catch (error) {
      throw new RpcException({
        statusCode: 404,
        message: 'Job not found'
      } as ErrorModel);
    }
    return { success: true, data: res };
  }

  public async getUser(id: string): Promise<SuccessResponse> {
    let res: User;
    try {
      res = await this.userRepository.findOneBy({ id });
      if (!res) {
        throw new Error();
      }
    } catch (error) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }
    return { success: true, data: res };
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async updateUser(
    id: string,
    updatedUser: UpdatedUserRequest,
    tokenUser: any
  ) {
    let userToUpdate: User = await this.userRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }

    if (tokenUser.id !== id && !tokenUser.roles.includes(UserRole.ROLE_ADMIN)) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized'
      } as ErrorModel);
    }

    if (updatedUser.password) {
      updatedUser.password = encryptPassword(updatedUser.password);
    }
    userToUpdate = Object.assign(userToUpdate, updatedUser);
    const { candidatesJobAds, ...data } = userToUpdate;

    try {
      await this.userRepository.update({ id: userToUpdate.id }, data);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      } as ErrorModel);
    }
    return { success: true, data: userToUpdate };
  }

  public async updateUserByToken(data: UpdatePassword) {
    const { token, ...updatedUser } = data;
    let res;
    try {
      res = await this.userRepository.update(
        { token },
        { ...updatedUser, isVerified: true }
      );
    } catch (error) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }
    if (res.affected === 0) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found'
      } as ErrorModel);
    }
    return res;
  }

  public async deleteUser(id: string) {
    await this.userRepository.delete({ id });
    return { success: true, message: 'User delete' };
  }

  public async seed() {
    await this.userRepository.delete({});
    const password: string = encryptPassword('password');
    let user = new User();
    user = Object.assign(user, {
      email: 'admin@admin.com',
      password: password,
      firstname: 'Admin',
      lastname: 'Jhon',
      birthdate: '01/01/1990',
      roles: [UserRole.ROLE_USER, UserRole.ROLE_ADMIN, UserRole.ROLE_EMPLOYEUR],
      isVerified: true
    });

    const administrator = this.userRepository.create(user);

    user = Object.assign(user, {
      email: 'user@user.com',
      firstname: 'User',
      roles: [UserRole.ROLE_USER]
    });

    const basicUser = this.userRepository.create(user);

    user = Object.assign(user, {
      email: 'user@user2.com',
      firstname: 'User2'
    });

    const basicUser2 = this.userRepository.create(user);

    await this.userRepository.save([administrator, basicUser, basicUser2]);
  }
}
