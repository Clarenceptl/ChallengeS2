import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  providers: [UsersService]
})
export class UsersModule {}