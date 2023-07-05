import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import { CreateQuizDto, UpdateQuizDto } from './quiz.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QuizService {
  constructor(
    @Inject(SERVICE_NAME.QUIZ) private readonly client: ClientProxy
  ) {}

  async createQuiz(data: CreateQuizDto, user: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.CREATE_QUIZ }, { user, data })
      );
      // TODO add quiz id to job add
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async updateQuiz(data: UpdateQuizDto, user: any, id: string) {
    let res: SuccessResponse;
    const payload = { id, data };
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.UPDATE_QUIZ }, { user, payload })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async deleteQuiz(id: string, user: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.DELETE_QUIZ }, { user, id })
      );
      // TODO delete quiz id to job add
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
