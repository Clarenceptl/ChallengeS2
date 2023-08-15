import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CandidatesJobAds,
  STATUS,
  UpdateStatusDTO
} from './candidates-job-ads.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/global';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CandidateJobAdsService {
  constructor(
    @InjectRepository(CandidatesJobAds)
    private readonly candidateJobAdsRepository: Repository<CandidatesJobAds>
  ) {}

  public async updateStatusCandidate(
    payload: UpdateStatusDTO
  ): Promise<SuccessResponse> {
    const { tokenUser, id, status } = payload;
    const res = await this.candidateJobAdsRepository.findOneBy({
      id
    });

    if (!res) {
      throw new RpcException({
        statusCode: 404,
        message: 'Job ad not found'
      });
    }

    if (res.jobAds.company.id !== tokenUser.company.id) {
      throw new RpcException({
        statusCode: 403,
        message: 'You are not allowed to do this action'
      });
    }
    if (!Object.values<string>(STATUS).includes(status)) {
      throw new RpcException({
        statusCode: 400,
        message: 'Status is not valid'
      });
    }
    res.status = status;

    await this.candidateJobAdsRepository.save(res);
    return {
      success: true,
      data: res
    };
  }
}
