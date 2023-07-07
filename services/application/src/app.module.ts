import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AppointmentModule } from './appointment/appointment.module';
import { CompanyModule } from './company/company.module';
import { CompanyRevenueOptionsModule } from './company-revenue-options/company-revenue-options.module';
import { CompanySectorOptionsModule } from './company-sector-options/company-sector-options.module';
import { CompanySizeOptionsModule } from './company-size-options/company-size-options.module';
import { JobAdsModule } from './job-ads/job-ads.module';
import { SeedModule } from './seed/seed.module';
import { RequestLoggerMiddleware } from './global/request-logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_POSTGRES_HOST,
      port: 5432,
      username: process.env.DATABASE_POSTGRES_USER,
      password: process.env.DATABASE_POSTGRES_PASSWORD,
      database: process.env.DATABASE_POSTGRES_NAME,
      synchronize: true, // TODO: Remove this in production
      autoLoadEntities: true
    }),
    CompanyModule,
    UsersModule,
    AppointmentModule,
    CompanyRevenueOptionsModule,
    CompanySectorOptionsModule,
    CompanySizeOptionsModule,
    JobAdsModule,
    SeedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
