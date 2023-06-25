import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompanyService } from 'src/company/company.service';
import { CompanySectorOptionsService } from 'src/company-sector-options/company-sector-options.service';
import { CompanyRevenueOptionsService } from 'src/company-revenue-options/company-revenue-options.service';
import { CompanySizeOptionsService } from 'src/company-size-options/company-size-options.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService,
    private readonly companySectorService: CompanySectorOptionsService,
    private readonly companyRevenuService: CompanyRevenueOptionsService,
    private readonly companySizeService: CompanySizeOptionsService
  ) {}

  public async seed() {
    await Promise.all([
      this.usersService.seed(),
      this.companyRevenuService.seed(),
      this.companySectorService.seed(),
      this.companySizeService.seed()
    ]);

    const [companyRevenueOptions, companySectorOptions, companySizeOptions] =
      await Promise.all([
        this.companyRevenuService.findOne(),
        this.companySectorService.findOne(),
        this.companySizeService.findOne()
      ]);

    await this.companyService.seed({
      companySizeOptions,
      companyRevenueOptions,
      companySectorOptions
    });
  }
}
