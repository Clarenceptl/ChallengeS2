import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import { CreateJobAdsRequest, UpdateJobAdsRequest } from './job-ads.dto';

@Injectable()
export class JobAdsService {
  constructor(@Inject(SERVICE_NAME.APP) private readonly client: ClientProxy) {}

  public async getJobAds() {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_JOB_ADS }, {})
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async getJobAdsById(id: string) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_JOB_ADS_BY_ID }, id)
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async createJobAds(data: CreateJobAdsRequest, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_JOB_ADS },
          { data, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async updateJobAds(
    data: UpdateJobAdsRequest,
    id: string,
    tokenUser: any
  ) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_JOB_ADS },
          { data, id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async deleteJobAds(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.DELETE_JOB_ADS }, { id, tokenUser })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async applyJobAds(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.APPLY_JOB_ADS }, { id, tokenUser })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  public async cancelApplyJobAds(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.CANCEL_APPLY_JOB_ADS },
          { id, tokenUser }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
