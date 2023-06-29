import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';

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

  public async createJobAds(data: any, user: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.CREATE_JOB_ADS }, { data, user })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
