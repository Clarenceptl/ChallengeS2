import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRevenueOptions } from './company-revenue-options.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRevenueOptionsService {
  public constructor(
    @InjectRepository(CompanyRevenueOptions)
    private readonly companyRevenueRepository: Repository<CompanyRevenueOptions>
  ) {}

  public async findOne(): Promise<CompanyRevenueOptions> {
    return await this.companyRevenueRepository.findOne({ where: {} });
  }

  public async seed() {
    await this.companyRevenueRepository.delete({});
    const newOption = new CompanyRevenueOptions(this.companyRevenueRepository);
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
