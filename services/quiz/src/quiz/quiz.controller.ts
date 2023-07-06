import { Controller, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddAnswersDto,
  CreateQuizDto,
  DeleteQuestionDto,
  DeleteQuizDto,
  GetQuizDto,
  UpdateQuestionsAnswersDto,
  UpdateQuizDto,
  UserRole
} from 'src/models';
import { SERVICE_CMD } from 'src/enum';
import { Roles } from 'src/decorators/role.decorator';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.CREATE_QUIZ })
  public createQuiz(@Payload(ValidationPipe) payload: CreateQuizDto) {
    return this.quizService.createQuiz(payload);
  }

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.UPDATE_QUIZ })
  public updateQuiz(@Payload(ValidationPipe) payload: UpdateQuizDto) {
    return this.quizService.updateQuiz(payload);
  }

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.DELETE_QUIZ })
  public deleteQuiz(@Payload(ValidationPipe) payload: DeleteQuizDto) {
    return this.quizService.deleteQuiz(payload);
  }

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.ADD_QUESTIONS_ANSWERS })
  public addQuestionsAndAnswers(
    @Payload(ValidationPipe) payload: UpdateQuestionsAnswersDto
  ) {
    return this.quizService.createOrUpdateQuestionsAnswers(payload);
  }

  @Roles(UserRole.ROLE_EMPLOYEUR)
  @MessagePattern({ cmd: SERVICE_CMD.DELETE_QUESTIONS })
  public deleteQuestions(@Payload(ValidationPipe) payload: DeleteQuestionDto) {
    const { id } = payload;
    return this.quizService.deleteQuestions(id);
  }

  @MessagePattern({ cmd: SERVICE_CMD.ADD_USER_ANSWERS })
  public addUsersAnswers(@Payload(ValidationPipe) payload: AddAnswersDto) {
    return this.quizService.addQuizAnswers(payload);
  }

  @MessagePattern({ cmd: SERVICE_CMD.GET_QUIZ })
  public getQuiz(@Payload(ValidationPipe) payload: GetQuizDto) {
    return this.quizService.getQuiz(payload);
  }
}
