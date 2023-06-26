import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './global';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from './admin/admin.module';
import { CompanySizeOptionsModule } from './company-size-options/company-size-options.module';
import { CompanyRevenueOptionsModule } from './company-revenue-options/company-revenue-options.module';
import { CompanySectorOptionsModule } from './company-sector-options/company-sector-options.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JSON_WEB_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    UserModule,
    AdminModule,
    CompanySizeOptionsModule,
    CompanyRevenueOptionsModule,
    CompanySectorOptionsModule
  ],

  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
