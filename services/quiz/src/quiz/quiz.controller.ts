import { Controller, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateQuizDto, UpdateQuizDto } from 'src/models';
import { SERVICE_CMD } from 'src/enum';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @MessagePattern({ cmd: SERVICE_CMD.CREATE_QUIZ })
  public createQuiz(@Payload(ValidationPipe) payload: CreateQuizDto) {
    return this.quizService.createQuiz(payload);
  }
  //TODO
  // Role employeur + dans les users
  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_QUIZ })
  public updateQuiz(@Payload(ValidationPipe) payload: UpdateQuizDto) {
    const { id } = payload;
    return this.quizService.delete(id);
  }

  // Role employeur + dans les users
  @MessagePattern({ cmd: SERVICE_CMD.DELETE_QUIZ })
  public delete(token, id: string) {
    return this.quizService.delete(id);
  }
}
