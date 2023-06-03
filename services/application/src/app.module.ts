import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';

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
    UsersModule,
    SeedModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
