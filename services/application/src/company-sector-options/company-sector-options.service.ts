import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanySectorOptions } from './company-sector-options.entity';
import { Repository } from 'typeorm';
import { SuccessResponse } from 'src/global';
import { RpcException } from '@nestjs/microservices';
import { CreateCompanySectorOptionRequest } from './company-sector-options.dto';

@Injectable()
export class CompanySectorOptionsService {
  public constructor(
    @InjectRepository(CompanySectorOptions)
    private readonly companySectorRepository: Repository<CompanySectorOptions>
  ) {}

  public async findOne(): Promise<CompanySectorOptions> {
    return await this.companySectorRepository.findOne({ where: {} });
  }

  public async getCompanySectorOptions(): Promise<SuccessResponse> {
    let res: CompanySectorOptions[];
    try {
      res = await this.companySectorRepository.find({
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

  public async getCompanySectorOptionsById(
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanySectorOptions;
    try {
      res = await this.companySectorRepository.findOneBy({ id: parseInt(id) });
      if (!res) {
        throw new RpcException({
          statusCode: 404,
          message: 'Company Sector Option not found'
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

  public async createCompanySectorOptions(
    data: CreateCompanySectorOptionRequest
  ): Promise<SuccessResponse> {
    let res: CompanySectorOptions;
    try {
      const newOption = new CompanySectorOptions();
      newOption.sector = data.sector;
      res = await this.companySectorRepository.save(newOption);
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

  public async updateCompanySectorOptions(
    sector: string,
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanySectorOptions;
    try {
      const companySectorOptionToUpdate =
        await this.companySectorRepository.findOneBy({ id: parseInt(id) });
      if (!companySectorOptionToUpdate) {
        throw new RpcException({
          statusCode: 404,
          message: 'Company Sector Option not found'
        });
      }
      companySectorOptionToUpdate.sector = sector;
      res = await this.companySectorRepository.save(
        companySectorOptionToUpdate
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

  public async deleteCompanySectorOptions(
    id: string
  ): Promise<SuccessResponse> {
    let res: CompanySectorOptions;
    try {
      const companySectorOptionToDelete =
        await this.companySectorRepository.findOneBy({ id: parseInt(id) });
      if (!companySectorOptionToDelete) {
        throw new RpcException({
          statusCode: 404,
          message: 'Company Sector Option not found'
        });
      }
      res = await this.companySectorRepository.remove(
        companySectorOptionToDelete
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
    await this.companySectorRepository.delete({});
    const newOption = new CompanySectorOptions();
    newOption.sector = 'Agriculture';
    const option1 = this.companySectorRepository.create(newOption);

    newOption.sector = 'Arts, entertainment and recreation';
    const option2 = this.companySectorRepository.create(newOption);

    newOption.sector = 'Construction';
    const option3 = this.companySectorRepository.create(newOption);

    newOption.sector = 'Education';
    const option4 = this.companySectorRepository.create(newOption);

    newOption.sector = 'Finance and insurance';
    const option5 = this.companySectorRepository.create(newOption);

    newOption.sector = 'Information and communication';
    const option6 = this.companySectorRepository.create(newOption);

    await this.companySectorRepository.save([
      option1,
      option2,
      option3,
      option4,
      option5,
      option6
    ]);
  }
}
