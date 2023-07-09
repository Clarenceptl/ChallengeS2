import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SERVICE_NAME } from 'src/enum';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
      },
      {
        name: SERVICE_NAME.MAIL,
        transport: Transport.TCP,
        options: {
          host: 'mailing-service',
          port: 3024
        }
      }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
