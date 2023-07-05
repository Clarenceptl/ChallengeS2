import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAds } from './job-ads.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/global';
import { RpcException } from '@nestjs/microservices';
import { CreateJobAdsRequest } from './job-ads.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class JobAdsService {
  public constructor(
    @InjectRepository(JobAds)
    private readonly jobAdsRepository: Repository<JobAds>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async getJobAds(): Promise<SuccessResponse> {
    let res: JobAds[];
    try {
      res = await this.jobAdsRepository.find({
        order: {
          id: 'ASC'
        },
        relations: {
          candidates: true
        }
      });
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async getJobAdsById(id: string): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      res = await this.jobAdsRepository.findOneBy({
        id: parseInt(id)
      });
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async createJobAds(
    data: CreateJobAdsRequest,
    user: User
  ): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      const newJobAds = new JobAds();
      Object.assign(newJobAds, data);
      newJobAds.company = user.company;
      newJobAds.created_at = new Date();
      newJobAds.updated_at = new Date();
      res = await this.jobAdsRepository.save(newJobAds);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async updateJobAds(
    data: CreateJobAdsRequest,
    id: string,
    user: User
  ): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      const jobAdsToUpdate = await this.jobAdsRepository.findOneBy({
        id: parseInt(id)
      });
      if (!jobAdsToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
      if (jobAdsToUpdate.company.id !== user.company.id) {
        throw new RpcException({
          statusCode: 403,
          message: 'Forbidden'
        });
      }
      Object.assign(jobAdsToUpdate, data);
      jobAdsToUpdate.updated_at = new Date();
      res = await this.jobAdsRepository.save(jobAdsToUpdate);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async deleteJobAds(id: string, user: User): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      res = await this.jobAdsRepository.findOneBy({
        id: parseInt(id)
      });
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
      console.log('toto', res, user);
      if (res.company.id !== user.company.id) {
        throw new RpcException({
          statusCode: 403,
          message: 'Forbidden'
        });
      }
      console.log('toto', res);
      res = await this.jobAdsRepository.remove(res);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async applyJobAds(id: string, user: User): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      const jobAdsToUpdate: JobAds = await this.jobAdsRepository.findOne({
        where: {
          id: parseInt(id)
        },
        relations: {
          candidates: true
        }
      });
      const currentUser = await this.userRepository.findOneBy({
        id: user.id
      });
      if (!jobAdsToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
      if (
        jobAdsToUpdate.candidates?.length &&
        jobAdsToUpdate.candidates.find((candidate) => candidate.id === user.id)
      ) {
        throw new RpcException({
          statusCode: 401,
          message: 'You already applied for this job'
        });
      }
      jobAdsToUpdate.candidates.push(currentUser);
      res = await this.jobAdsRepository.save(jobAdsToUpdate);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }

  public async cancelApplyJobAds(
    id: string,
    user: User
  ): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      const jobAdsToUpdate: JobAds = await this.jobAdsRepository.findOneBy({
        id: parseInt(id)
      });
      if (!jobAdsToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
      if (
        !jobAdsToUpdate.candidates.find((candidate) => candidate.id === user.id)
      ) {
        throw new RpcException({
          statusCode: 409,
          message: 'You did not apply for this job'
        });
      }
      jobAdsToUpdate.candidates = jobAdsToUpdate.candidates.filter(
        (candidate) => candidate.id !== user.id
      );
      res = await this.jobAdsRepository.save(jobAdsToUpdate);
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: error.message
      });
    }
    return {
      success: true,
      data: res
    };
  }
}
