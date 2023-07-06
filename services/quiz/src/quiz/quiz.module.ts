import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema, Quiz, QuizSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
