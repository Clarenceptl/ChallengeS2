import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [UsersModule, CompanyModule],
  providers: [SeedService]
})
export class SeedModule {}
