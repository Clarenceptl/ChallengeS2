import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema, Quiz, QuizSchema } from 'src/models';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from '../enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
    ClientsModule.register([
      {
        name: SERVICE_NAME.APP,
        transport: Transport.TCP,
        options: {
          host: process.env.APP_SERVICE_HOST ?? 'app-service',
          port: parseInt(process.env.APP_SERVICE_PORT) ?? 3021
        }
      }
    ])
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
