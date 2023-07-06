import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  _id: Types.ObjectId;

  @Prop({
    type: String,
    required: true
  })
  id: string;

  @Prop({
    type: String,
    required: true
  })
  label: string;

  @Prop({
    type: Date,
    default: Date.now
  })
  createdAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
