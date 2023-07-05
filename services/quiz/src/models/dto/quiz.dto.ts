import { User } from './user.dto';

export interface ResponseQuiz {
  userId: string;
  score: number;
  tentative: number;
}

export class CreateQuizDto {
  user: User;
  title: string;
  idJobAds: string;
  tempsParQuestionSecond: number;
}

export class UpdateQuizDto {
  user: User;
  id: string;
  title?: string;
  tempsParQuestionSecond?: number;
}

export class DeleteQuizDto {
  user: User;
  id: string;
}
