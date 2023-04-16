import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APPLICATION_SERVICE',
        transport: Transport.TCP
      }
    ])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
