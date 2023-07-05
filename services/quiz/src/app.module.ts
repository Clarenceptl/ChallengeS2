import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE_MONGO_URL), QuizModule],
  controllers: [],
  providers: []
})
export class AppModule {}
