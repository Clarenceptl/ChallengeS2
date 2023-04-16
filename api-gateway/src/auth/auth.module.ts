import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'app-service',
          port: 3021
        }
      }
    ])
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
