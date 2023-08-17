import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from '../global';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User]),
    ClientsModule.register([
      {
        name: SERVICE_NAME.MAILING,
        transport: Transport.TCP,
        options: {
          host: process.env.MAILING_SERVICE_HOST ?? 'mailing-service',
          port: parseInt(process.env.MAILING_SERVICE_PORT) ?? 3024
        }
      }
    ])
  ],

  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
