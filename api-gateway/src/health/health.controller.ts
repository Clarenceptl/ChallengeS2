import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator
} from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/global';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator
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
}
