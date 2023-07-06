import { Types } from 'mongoose';
import { Answer } from '../entities/answer.model';
import { User } from './user.dto';

export interface ResponseQuiz {
  userId: string;
  score: number;
  tentative: number;
}

export class CreateQuizDto {
  tokenUser: User;
  title: string;
  idJobAds: string;
  tempsParQuestionSecond: number;
}

export class UpdateQuizDto {
  tokenUser: User;
  id: string;
  title?: string;
  tempsParQuestionSecond?: number;
}

export class UpdateQuestionsAnswersDto {
  idQuestion?: Types.ObjectId;
  tokenUser: User;
  idQuiz: string;
  label: string;
  correct: Answer;
  answers: Answer[];
}

export class DeleteQuizDto {
  tokenUser: User;
  id: string;
}

export class DeleteQuestionDto {
  tokenUser: User;
  id: Types.ObjectId;
}

export class AddAnswersDto {
  tokenUser: User;
  quizId: string;
  answers: Answer[];
}
