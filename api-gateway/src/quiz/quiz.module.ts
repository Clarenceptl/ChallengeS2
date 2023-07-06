import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/global';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_NAME.QUIZ,
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 3028
        }
      }
    ])
  ],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
