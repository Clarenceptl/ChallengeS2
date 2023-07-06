import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ResponseQuiz } from '../dto/quiz.dto';
import { User } from '../dto/user.dto';
import { Question, QuestionSchema } from './question.model';

export type QuizDocument = HydratedDocument<Quiz>;

@Schema()
export class Quiz {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true
  })
  title: string;

  @Prop({
    type: Number,
    default: 0
  })
  nbQuestions: number;

  @Prop({
    type: String,
    required: true
  })
  idJobAds: string;

  @Prop({ type: [QuestionSchema], default: [] })
  questions: Question[];

  @Prop({
    type: Number,
    required: true
  })
  tempsParQuestionSecond: number;

  @Prop({
    type: Object,
    required: true
  })
  creator: User;

  @Prop({ type: Array<ResponseQuiz>, default: [] })
  reponses: ResponseQuiz[];

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
