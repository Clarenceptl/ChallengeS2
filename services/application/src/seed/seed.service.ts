import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class SeedService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly companyService: CompanyService
  ) {}

  public async seed() {
    await Promise.all([this.usersService.seed(), this.companyService.seed()]);
  }
}
