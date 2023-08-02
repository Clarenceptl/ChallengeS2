import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAds } from './job-ads.entity';
import { Repository } from 'typeorm';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from 'src/global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateJobAdsRequest } from './job-ads.dto';
import { User, UserRole } from 'src/users/users.entity';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JobAdsService {
  public constructor(
    @InjectRepository(JobAds)
    private readonly jobAdsRepository: Repository<JobAds>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(SERVICE_NAME.QUIZ) private readonly quizService: ClientProxy
  ) {}

  public async getJobAds(): Promise<SuccessResponse> {
    let res: JobAds[];
    try {
      res = await this.jobAdsRepository.find({
        order: {
          id: 'ASC'
        },
        relations: ['candidatesJobAds']
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
      res = await this.jobAdsRepository.findOne({
        where: {
          id: parseInt(id)
        },
        relations: ['candidatesJobAds', 'candidatesJobAds.candidate']
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

    const newJobAds = new JobAds();
    Object.assign(newJobAds, data);
    newJobAds.company = user.company;
    newJobAds.created_at = new Date();
    newJobAds.updated_at = new Date();
    try {
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

  public async updateQuiz(
    id: string,
    quizId: string | null
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
      jobAdsToUpdate.quizId = quizId;
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

  public async deleteQuiz(quizId: string | null): Promise<SuccessResponse> {
    let res: JobAds;
    try {
      const jobAdsToUpdate = await this.jobAdsRepository.findOneBy({
        quizId
      });
      if (!jobAdsToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'Job ad not found'
        });
      }
      jobAdsToUpdate.quizId = null;
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
    let res: JobAds = await this.jobAdsRepository.findOneBy({
      id: parseInt(id)
    });
    if (!res) {
      throw new RpcException({
        statusCode: 404,
        message: 'Job ad not found'
      });
    }
    if (
      res.company.id !== user.company.id &&
      !user.roles.includes(UserRole.ROLE_ADMIN)
    ) {
      throw new RpcException({
        statusCode: 403,
        message: 'Forbidden'
      });
    }
    try {
      if (res.quizId) {
        await lastValueFrom(
          this.quizService.send(
            { cmd: SERVICE_CMD.DELETE_QUIZ },
            { id: res.quizId, tokenUser: user }
          )
        );
      }
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
    if (user.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
      throw new RpcException({
        success: false,
        statusCode: 403,
        message: 'Forbidden'
      });
    }
    try {
      const jobAdsToUpdate: JobAds = await this.jobAdsRepository.findOne({
        where: {
          id: parseInt(id)
        },
        relations: {
          candidatesJobAds: true
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
        jobAdsToUpdate.candidatesJobAds.length &&
        jobAdsToUpdate.candidatesJobAds.find(
          (candidatesJobAds) => candidatesJobAds.candidate.id === user.id
        )
      ) {
        throw new RpcException({
          statusCode: 401,
          message: 'You already applied for this job'
        });
      }
      const newCandidature = new CandidatesJobAds();
      newCandidature.candidate = currentUser;
      jobAdsToUpdate.candidatesJobAds.push(newCandidature);
      console.log(jobAdsToUpdate);
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
        !jobAdsToUpdate.candidatesJobAds.find(
          (candidate) => candidate.candidate.id === user.id
        )
      ) {
        throw new RpcException({
          statusCode: 409,
          message: 'You did not apply for this job'
        });
      }
      jobAdsToUpdate.candidatesJobAds = jobAdsToUpdate.candidatesJobAds.filter(
        (candidatesJobAds) => candidatesJobAds.candidate.id !== user.id
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
