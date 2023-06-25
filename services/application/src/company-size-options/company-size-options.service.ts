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

  public async findOne(): Promise<CompanySizeOptions> {
    return await this.companySizeOptionsRepository.findOne({ where: {} });
  }

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

  public async seed() {
    await this.companySizeOptionsRepository.delete({});
    const newOption = new CompanySizeOptions();
    newOption.size = '1-10';
    const option1 = this.companySizeOptionsRepository.create(newOption);

    newOption.size = '11-50';
    const option2 = this.companySizeOptionsRepository.create(newOption);

    newOption.size = '51-200';
    const option3 = this.companySizeOptionsRepository.create(newOption);

    await this.companySizeOptionsRepository.save([option1, option2, option3]);
  }
}
