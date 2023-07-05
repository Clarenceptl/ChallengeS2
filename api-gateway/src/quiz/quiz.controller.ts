import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Post()
  @HttpCode(201)
  public createQuiz(
    @Body(ValidationPipe) data: CreateQuizDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    return this.quizService.createQuiz(data, user);
  }

  @Post('add-questions-answers')
  @HttpCode(201)
  public addQuestionsAnswers(
    @Body(ValidationPipe) data: CreateQuizDto,
    @Req() req: any
  ) {
    const user = req?.user ?? null;
    // finish TODO
    return this.quizService.addQuestionsAnswers(data, user);
  }

  @Patch('')
  @HttpCode(200)
  public updatedQuestionsAnswers(
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

  @Delete(':id')
  @HttpCode(200)
  public deleteQuiz(@Param('id', ValidationPipe) id: string, @Req() req: any) {
    const user = req?.user ?? null;
    return this.quizService.deleteQuiz(id, user);
  }
}
