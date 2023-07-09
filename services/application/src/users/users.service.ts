import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import {
  CreatedUserRequest,
  UpdatedUserRequest,
  SendEmailRequest
} from './users.dto';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { createRandToken, encryptPassword } from '../helpers';
import { lastValueFrom } from 'rxjs';
import type { ErrorModel } from '../global';
import { Company } from 'src/company/company.entity';
import { JobAds } from 'src/job-ads/job-ads.entity';
import e from 'express';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(JobAds)
    private readonly jobAdsRepository: Repository<JobAds>,
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

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getMyJobs(tokenUser: any) {
    let res: JobAds[];
    try {
      const userCompany = tokenUser?.company?.id;
      const jobAds = await this.jobAdsRepository.find({
        where: { company: userCompany },
        relations: ['candidates'],
        select: {
          candidates: {
            id: true,
            email: true,
            firstname: true,
            lastname: true,
            birthdate: true
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
    let res: User;
    try {
      let userToUpdate: User = await this.userRepository.findOneBy({ id });
      if (!userToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'User not found'
        } as ErrorModel);
      }
      if (tokenUser.id !== id) {
        throw new RpcException({
          statusCode: 401,
          message: 'Unauthorized'
        } as ErrorModel);
      }
      userToUpdate = Object.assign(userToUpdate, updatedUser);
      res = await this.userRepository.save(userToUpdate);
    } catch (error) {
      throw new RpcException({
        statusCode: 404,
        message: error.message
      } as ErrorModel);
    }
    return { success: true, data: res };
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
