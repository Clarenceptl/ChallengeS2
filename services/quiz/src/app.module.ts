import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_MONGO_URL), QuizModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
