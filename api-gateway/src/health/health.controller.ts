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
  private mailingServiceHost: string =
    process.env.MAILING_SERVICE_HOST ?? 'mailing-service';
  private authServiceHost: string =
    process.env.AUTH_SERVICE_HOST ?? 'auth-service';
  private appServiceHost: string =
    process.env.APP_SERVICE_HOST ?? 'app-service';
  private quizServiceHost: string =
    process.env.QUIZ_SERVICE_HOST ?? 'quiz-service';

  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private mongoose: MongooseHealthIndicator
  ) {}

  @Get('app-service')
  @isPublic()
  @HealthCheck()
  checkAppService() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(this.appServiceHost, {
          transport: Transport.TCP,
          options: {
            host: this.appServiceHost,
            port: parseInt(process.env.APP_SERVICE_PORT) ?? 3021
          }
        })
    ]);
  }

  @Get('auth-service')
  @isPublic()
  @HealthCheck()
  checkAuth() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(this.authServiceHost, {
          transport: Transport.TCP,
          options: {
            host: this.authServiceHost,
            port: parseInt(process.env.AUTH_SERVICE_PORT) ?? 3022
          }
        })
    ]);
  }

  @Get('mailing-service')
  @isPublic()
  @HealthCheck()
  checkMail() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(this.mailingServiceHost, {
          transport: Transport.TCP,
          options: {
            host: this.mailingServiceHost,
            port: parseInt(process.env.MAILING_SERVICE_PORT) ?? 3024
          }
        })
    ]);
  }

  @Get('quiz-service')
  @isPublic()
  @HealthCheck()
  checkQuiz() {
    return this.health.check([
      async () =>
        this.microservice.pingCheck(this.quizServiceHost, {
          transport: Transport.TCP,
          options: {
            host: this.quizServiceHost,
            port: parseInt(process.env.QUIZ_SERVICE_PORT) ?? 3028
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
