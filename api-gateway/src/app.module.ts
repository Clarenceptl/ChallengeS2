import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ApplicationModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
