import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';
import { JobAds } from 'src/job-ads/job-ads.entity';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, JobAds, Company]),
    ClientsModule.register([
      {
        name: SERVICE_NAME.MAILING,
        transport: Transport.TCP,
        options: {
          host: 'mailing-service',
          port: 3024
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
