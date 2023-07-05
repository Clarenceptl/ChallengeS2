import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuizDto, Quiz } from 'src/models';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}
  async createQuiz(payload: CreateQuizDto) {
    const { user, ...data } = payload;
    const quiz = new this.quizModel(data);
    quiz.user.push(user);
    return await quiz.save();
  }

  async delete(id: string) {
    const quiz = await this.quizModel.deleteOne({ _id: id });
    if (!quiz) throw new Error('Quiz not found');
    return quiz;
  }
}
