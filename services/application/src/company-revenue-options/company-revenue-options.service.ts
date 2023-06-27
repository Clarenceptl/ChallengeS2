import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRevenueOptions } from './company-revenue-options.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/global';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CompanyRevenueOptionsService {
  public constructor(
    @InjectRepository(CompanyRevenueOptions)
    private readonly companyRevenueRepository: Repository<CompanyRevenueOptions>
  ) {}

  public async findOne(): Promise<CompanyRevenueOptions> {
    return await this.companyRevenueRepository.findOne({ where: {} });
  }

  public async getCompanyRevenueOptions(): Promise<SuccessResponse> {
    let res: CompanyRevenueOptions[];
    try {
      res = await this.companyRevenueRepository.find({
        order: {
          id: 'ASC'
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

  public async getCompanyRevenueOptionsById(
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanyRevenueOptions;
    try {
      res = await this.companyRevenueRepository.findOneBy({ id: parseInt(id) });
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Company Revenue Options not found'
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

  public async createCompanyRevenueOptions(
    companyRevenueOptions: CompanyRevenueOptions
  ): Promise<SuccessResponse> {
    let res: CompanyRevenueOptions;
    try {
      res = await this.companyRevenueRepository.save(companyRevenueOptions);
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

  public async updateCompanyRevenueOptions(
    revenue: string,
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanyRevenueOptions;
    try {
      const companyRevenueOptionsToUpdate =
        await this.companyRevenueRepository.findOneBy({ id: parseInt(id) });
      companyRevenueOptionsToUpdate.revenue = revenue;
      res = await this.companyRevenueRepository.save(
        companyRevenueOptionsToUpdate
      );
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

  public async deleteCompanyRevenueOptions(
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanyRevenueOptions;
    try {
      const companyRevenueOptionsToDelete =
        await this.companyRevenueRepository.findOneBy({ id: parseInt(id) });
      res = await this.companyRevenueRepository.remove(
        companyRevenueOptionsToDelete
      );
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
    await this.companyRevenueRepository.delete({});
    const newOption = new CompanyRevenueOptions();
    newOption.revenue = '0-1M';
    const option1 = this.companyRevenueRepository.create(newOption);

    newOption.revenue = '1-5M';
    const option2 = this.companyRevenueRepository.create(newOption);

    newOption.revenue = '5-10M';
    const option3 = this.companyRevenueRepository.create(newOption);

    newOption.revenue = '10-50M';
    const option4 = this.companyRevenueRepository.create(newOption);

    await this.companyRevenueRepository.save([
      option1,
      option2,
      option3,
      option4
    ]);
  }
}
