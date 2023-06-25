import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanySectorOptions } from './company-sector-options.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanySectorOptionsService {
  public constructor(
    @InjectRepository(CompanySectorOptions)
    private readonly companySectorRepository: Repository<CompanySectorOptions>
  ) {}

  public async findOne(): Promise<CompanySectorOptions> {
    return await this.companySectorRepository.findOne({ where: {} });
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
