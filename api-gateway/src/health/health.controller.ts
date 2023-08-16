import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
  TypeOrmHealthIndicator
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/global';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private mongoose: MongooseHealthIndicator
  ) {}

  @Get(process.env.APP_SERVICE_HOST)
  @isPublic()
  @HealthCheck()
  checkAppService() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(process.env.APP_SERVICE_HOST, {
          transport: Transport.TCP,
          options: {
            host: process.env.APP_SERVICE_HOST,
            port: process.env.APP_SERVICE_PORT
          }
        })
    ]);
  }

  @Get(process.env.AUTH_SERVICE_HOST)
  @isPublic()
  @HealthCheck()
  checkAuth() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(process.env.AUTH_SERVICE_HOST, {
          transport: Transport.TCP,
          options: {
            host: process.env.AUTH_SERVICE_HOST,
            port: process.env.AUTH_SERVICE_PORT
          }
        })
    ]);
  }

  @Get(process.env.MAILING_SERVICE_HOST)
  @isPublic()
  @HealthCheck()
  checkMail() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(process.env.MAILING_SERVICE_HOST, {
          transport: Transport.TCP,
          options: {
            host: process.env.MAILING_SERVICE_HOST,
            port: process.env.MAILING_SERVICE_PORT
          }
        })
    ]);
  }

  @Get(process.env.QUIZ_SERVICE_HOST)
  @isPublic()
  @HealthCheck()
  checkQuiz() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(process.env.QUIZ_SERVICE_HOST, {
          transport: Transport.TCP,
          options: {
            host: process.env.QUIZ_SERVICE_HOST,
            port: process.env.QUIZ_SERVICE_PORT
          }
        })
    ]);
  }

  @Get(process.env.QUIZ_SERVICE_HOST)
  @isPublic()
  @HealthCheck()
  checkPostgresDb() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(process.env.QUIZ_SERVICE_HOST, {
          transport: Transport.TCP,
          options: {
            host: process.env.QUIZ_SERVICE_HOST,
            port: process.env.QUIZ_SERVICE_PORT
          }
        })
    ]);
  }

  @Get('postgres')
  @isPublic()
  @HealthCheck()
  checkPostgres() {
    return this.health.check([async () => this.db.pingCheck('typeorm')]);
  }

  @Get('mongo')
  @isPublic()
  @HealthCheck()
  checkMongo() {
    return this.health.check([async () => this.mongoose.pingCheck('mongoose')]);
  }
}
