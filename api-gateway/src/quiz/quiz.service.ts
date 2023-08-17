import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  SERVICE_CMD,
  SERVICE_NAME,
  SuccessResponse,
  handleErrors
} from 'src/global';
import {
  CreateQuestionsAnswersDto,
  CreateQuizDto,
  UpdateQuestionsAnswersDto,
  UpdateQuizDto,
  UserAnswersDto
} from './quiz.dto';
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
        this.client.send(
          { cmd: SERVICE_CMD.CREATE_QUIZ },
          { tokenUser: { id: user.id, roles: user.roles }, ...data }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async getQuiz(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.GET_QUIZ }, { tokenUser, id })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async addQuestionsAnswers(
    id: string,
    data: CreateQuestionsAnswersDto,
    tokenUser: any
  ) {
    let res: SuccessResponse;
    const payload = { idQuiz: id, ...data };
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.ADD_QUESTIONS_ANSWERS },
          { tokenUser, ...payload }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async updateQuestionsAnswers(
    id: string,
    data: UpdateQuestionsAnswersDto,
    tokenUser: any
  ) {
    let res: SuccessResponse;
    const payload = { idQuiz: id, ...data };
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.ADD_QUESTIONS_ANSWERS },
          { tokenUser, ...payload }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async addQuizAnswers(id: string, data: UserAnswersDto, tokenUser: any) {
    let res: SuccessResponse;
    const payload = { idQuiz: id, answers: data };
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.ADD_USER_ANSWERS },
          { tokenUser, ...payload }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async updateQuiz(data: UpdateQuizDto, user: any, id: string) {
    let res: SuccessResponse;
    const payload = { id, ...data };
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.UPDATE_QUIZ },
          { tokenUser: { id: user.id, roles: user.roles }, ...payload }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async deleteQuiz(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send({ cmd: SERVICE_CMD.DELETE_QUIZ }, { tokenUser, id })
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }

  async deleteQuestions(id: string, tokenUser: any) {
    let res: SuccessResponse;
    try {
      res = await lastValueFrom(
        this.client.send(
          { cmd: SERVICE_CMD.DELETE_QUESTION },
          { tokenUser, id }
        )
      );
    } catch (error) {
      handleErrors(error);
    }
    return res;
  }
}
