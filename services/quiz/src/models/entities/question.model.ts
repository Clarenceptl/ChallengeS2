import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Answer, AnswerSchema } from './answer.model';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true
  })
  label: string;

  @Prop({ type: [AnswerSchema], default: [] })
  answers: Answer[];

  @Prop({ type: AnswerSchema, default: {} })
  correctAnswer: Answer;

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
