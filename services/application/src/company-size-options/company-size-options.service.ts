import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySizeOptions } from './company-size-option.entity';
import { SERVICE_CMD, SERVICE_NAME, SuccessResponse } from '../global';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { createRandToken, encryptPassword } from '../helpers';
import { lastValueFrom } from 'rxjs';
import type { ErrorModel } from '../global';

@Injectable()
export class CompanySizeOptionsService {
  public constructor(
    @InjectRepository(CompanySizeOptions)
    private readonly companySizeOptionsRepository: Repository<CompanySizeOptions>
  ) {}

  public async getCompanySizeOptions(): Promise<SuccessResponse> {
    let res: CompanySizeOptions[];
    try {
      res = await this.companySizeOptionsRepository.find();
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
