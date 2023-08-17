import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from 'src/company/company.module';
import { CompanySectorOptionsModule } from 'src/company-sector-options/company-sector-options.module';
import { CompanyRevenueOptionsModule } from 'src/company-revenue-options/company-revenue-options.module';
import { CompanySizeOptionsModule } from 'src/company-size-options/company-size-options.module';

@Module({
  imports: [
    UsersModule,
    CompanyModule,
    CompanySectorOptionsModule,
    CompanyRevenueOptionsModule,
    CompanySizeOptionsModule
  ],
  providers: [SeedService]
})
export class SeedModule {}
