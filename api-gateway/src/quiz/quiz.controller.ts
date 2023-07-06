import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  CreateQuestionsAnswersDto,
  CreateQuizDto,
  UpdateQuestionsAnswersDto,
  UpdateQuizDto,
  UserAnswersDto
} from './quiz.dto';

@Controller({ path: 'quiz', version: '1' })
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get(':id')
  @HttpCode(201)
  public getQuiz(@Param('id') id: string, @Req() req: any) {
    const user = req?.user ?? null;
    return this.quizService.getQuiz(id, user);
  }
  @Post()
  @HttpCode(201)
  public createQuiz(
    @Body(ValidationPipe) data: CreateQuizDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.createQuiz(data, user);
  }

  @Post('questions/:id')
  @HttpCode(201)
  public addQuestionsAnswers(
    @Param('id') id: string,
    @Body(ValidationPipe) data: CreateQuestionsAnswersDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.addQuestionsAnswers(id, data, user);
  }

  @Patch('addResponse/:quizId')
  @HttpCode(200)
  public addResponse(
    @Param('quizId') id: string,
    @Body(ValidationPipe) data: UserAnswersDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.addQuizAnswers(id, data, user);
  }

  @Patch('questions/:id')
  @HttpCode(200)
  public updateQuestion(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateQuestionsAnswersDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.updateQuestionsAnswers(id, data, user);
  }

  @Patch(':id')
  @HttpCode(200)
  public updatedQuiz(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateQuizDto,
    @Req() req: any
  ) {
    if (!data.tempsParQuestionSecond && !data.title) {
      throw new UnauthorizedException('No data to update');
    }
    const user = req?.user ?? null;
    return this.quizService.updateQuiz(data, user, id);
  }

  @Delete('question/:id')
  @HttpCode(200)
  public deleteQuestion(
    @Param('id', ValidationPipe) id: string,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.deleteQuestions(id, user);
  }

  @Delete(':id')
  @HttpCode(200)
  public deleteQuiz(@Param('id', ValidationPipe) id: string, @Req() req: any) {
    const user = req?.user ?? null;
    return this.quizService.deleteQuiz(id, user);
  }
}
