import { Module } from '@nestjs/common';
import { CompanySizeOptionsService } from './company-size-options.service';
import { CompanySizeOptionsController } from './company-size-options.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.APP,
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3021
        }
      }
    ])
  ],
  providers: [CompanySizeOptionsService],
  controllers: [CompanySizeOptionsController]
})
export class CompanySizeOptionsModule {}
