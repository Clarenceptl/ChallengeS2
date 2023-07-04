import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.AUTH,
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3022
        }
      }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
