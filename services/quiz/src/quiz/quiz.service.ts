import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AddAnswersDto,
  CreateQuizDto,
  DeleteQuizDto,
  GetQuizDto,
  Question,
  Quiz,
  UpdateQuestionsAnswersDto,
  UpdateQuizDto,
  UserRole
} from 'src/models';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(Question.name) private questionModel: Model<Question>
  ) {}

  async getQuiz(payload: GetQuizDto) {
    const { id, tokenUser } = payload;
    const quiz = await this.quizModel.findOne({ idJobAds: id });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }
    if (!tokenUser.roles.includes(UserRole.ROLE_EMPLOYEUR)) {
      for (const question of quiz.questions) {
        question.correctAnswer = null;
      }
    }

    return {
      success: true,
      data: quiz
    };
  }

  async createQuiz(payload: CreateQuizDto) {
    const { tokenUser, ...data } = payload;
    const quiz = new this.quizModel(data);
    quiz.creator = tokenUser;
    await quiz.save();
    return {
      success: true,
      data: quiz
    };
  }

  async deleteQuiz(payload: DeleteQuizDto) {
    const { id, tokenUser } = payload;
    const objectId = new Types.ObjectId(id);
    const quiz = await this.quizModel.findOne({ _id: objectId });

    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }

    if (quiz.creator.id !== tokenUser.id) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    try {
      await quiz.deleteOne();
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error'
      });
    }
    return {
      success: true,
      data: quiz
    };
  }

  async updateQuiz(data: UpdateQuizDto) {
    const { id, tokenUser, ...payload } = data;
    const objectId = new Types.ObjectId(id);
    const quiz = await this.quizModel.findOne({ _id: objectId });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }

    if (quiz.creator.id !== tokenUser.id) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }
    try {
      quiz.set(payload);
      await quiz.save();
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error'
      });
    }
    quiz.set(payload);
    await quiz.save();
    return {
      success: true,
      data: quiz
    };
  }

  async addQuizAnswers(payload: AddAnswersDto) {
    const { tokenUser, idQuiz, answers } = payload;
    const quiz = await this.quizModel.findOne({ _id: idQuiz });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }
    let resultQuiz = 0;
    for (const question of quiz.questions) {
      const answer = answers.find(
        (element) => element.idQuestion === question._id.toString()
      );
      if (!answer) {
        continue;
      }
      if (answer.id === question.correctAnswer.id) {
        resultQuiz += 1;
      }
    }
    const res: number = quiz.reponses.findIndex(
      (element) => element.userId === tokenUser.id
    );

    if (res !== -1) {
      if (quiz.reponses[res].score < resultQuiz) {
        quiz.reponses[res].score = resultQuiz;
      }
      quiz.reponses[res].tentative += 1;
    } else {
      quiz.set({
        reponses: [
          ...quiz.reponses,
          { userId: tokenUser.id, score: resultQuiz, tentative: 1 }
        ]
      });
    }
    try {
      quiz.markModified('reponses');
      await quiz.save();
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    return {
      success: true,
      data: quiz
    };
  }

  async createOrUpdateQuestionsAnswers(payload: UpdateQuestionsAnswersDto) {
    const { idQuiz, idQuestion, tokenUser, ...data } = payload;
    const objectId = new Types.ObjectId(idQuiz);
    const quiz = await this.quizModel.findOne({ _id: objectId });

    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }
    if (quiz.creator.id !== tokenUser.id) {
      throw new RpcException({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }
    if (idQuestion) {
      const objectId = new Types.ObjectId(idQuestion);
      const question = quiz.questions.findIndex((element) => {
        return element._id.equals(objectId);
      });
      if (question !== -1) {
        quiz.questions[question].label = data.label;
        quiz.questions[question].correctAnswer = data.correct;
        quiz.questions[question].answers = data.answers;
      } else {
        throw new RpcException({
          statusCode: 404,
          message: 'Question not found'
        });
      }
    } else {
      const test = new this.questionModel({
        label: data.label,
        correctAnswer: data.correct,
        answers: data.answers
      });
      quiz.set({
        questions: [...quiz.questions, test]
      });
    }

    try {
      await quiz.save();
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    return {
      success: true,
      data: quiz
    };
  }

  async deleteQuestions(id: string) {
    const objectId = new Types.ObjectId(id);
    const quiz = await this.quizModel.findOne({
      questions: {
        $elemMatch: {
          _id: objectId
        }
      }
    });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Question not found'
      });
    }
    quiz.questions = quiz.questions.filter((element) =>
      element._id.equals(objectId)
    );
    quiz.updateOne({ questions: quiz.questions });
    try {
      quiz.markModified('questions');
      await quiz.save();
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        message: 'Internal server error'
      });
    }

    return {
      success: true,
      data: quiz
    };
  }
}
