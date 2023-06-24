import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from '../global';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
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

  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
