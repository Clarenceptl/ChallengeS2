import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_POSTGRES_HOST,
      port: 5432,
      username: process.env.DATABASE_POSTGRES_USER,
      password: process.env.DATABASE_POSTGRES_PASSWORD,
      database: process.env.DATABASE_POSTGRES_DB,
      synchronize: false,
      autoLoadEntities: true,
      ssl: process.env.CHALLENGE_ENV === 'production'
    }),
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URL)
  ],
  controllers: [HealthController]
})
export class HealthModule {}
