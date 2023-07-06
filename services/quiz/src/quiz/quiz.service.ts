import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  AddAnswersDto,
  CreateQuizDto,
  DeleteQuizDto,
  Question,
  Quiz,
  UpdateQuestionsAnswersDto,
  UpdateQuizDto
} from 'src/models';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<Quiz>,
    @InjectModel(Question.name) private questionModel: Model<Question>
  ) {}

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
    const quiz = await this.quizModel.findOne({ _id: payload.quizId });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Quiz not found'
      });
    }
    let resultQuiz = 0;
    for (const question of quiz.questions) {
      const isCorrect = payload.answers.find(
        (element) => element._id === question.correctAnswer._id
      );
      if (isCorrect) {
        resultQuiz++;
      }
    }
    const res: number = quiz.reponses.findIndex(
      (element) => element.userId === payload?.tokenUser?.id
    );
    if (res !== -1) {
      quiz.reponses[res].score = resultQuiz;
      quiz.reponses[res].tentative += 1;
    } else {
      quiz.reponses.push({
        userId: payload?.tokenUser?.id,
        score: resultQuiz,
        tentative: 1
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

  async createOrUpdateQuestionsAnswers(payload: UpdateQuestionsAnswersDto) {
    const { idQuiz, idQuestion, tokenUser, ...data } = payload;
    // console.log('data', payload);
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
      console.log('data', idQuestion, quiz, data);
      quiz.updateOne(
        { 'questions._id': idQuestion },
        {
          $set: {
            'questions.$.label': data.label,
            'questions.$.correctAnswer': data.correct,
            'questions.$.answers': data.answers
          }
        }
      );
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

  async deleteQuestions(id: Types.ObjectId) {
    const quiz = await this.quizModel.findOne({
      questions: {
        _id: id
      }
    });
    if (!quiz) {
      throw new RpcException({
        statusCode: 404,
        message: 'Question not found'
      });
    }
    quiz.questions = quiz.questions.filter((element) => element._id !== id);
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
}

//   async addQuestionsAnswers(
//     id: string,
//     data: CreateQuestionsAnswersDto,
//     user: any
//   ) {
//     let res: SuccessResponse;
//     const payload = { idQuiz: id, data };
//     try {
//       res = await lastValueFrom(
//         this.client.send(
//           { cmd: SERVICE_CMD.ADD_QUESTIONS_ANSWERS },
//           { user, payload }
//         )
//       );
//     } catch (error) {
//       handleErrors(error);
//     }
//     return res;
//   }
