import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.APP,
        transport: Transport.TCP,
        options: {
          host: 'app-service',
          port: 3021
        }
      }
    ])
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
