import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize
} from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  idJobAds: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(5) // 5 seconds
  @Max(300) // 5 minutes
  tempsParQuestionSecond: number;
}

export class UpdateQuizDto {
  @Optional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Optional()
  @IsNumber()
  @IsNotEmpty()
  @Min(5) // 5 seconds
  @Max(300) // 5 minutes
  tempsParQuestionSecond: number;
}

export class Answers {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}

export class AnswersUser extends Answers {
  @IsString()
  @IsNotEmpty()
  idQuestion: string;
}

export class UserAnswersDto {
  answers: AnswersUser[];
}

export class CreateQuestionsAnswersDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNotEmpty()
  @Type(() => Answers)
  correct: Answers;

  @IsNotEmpty()
  @ArrayMinSize(2)
  @ArrayMaxSize(4)
  @Type(() => Answers)
  answers: Answers[];
}

export class UpdateQuestionsAnswersDto extends CreateQuestionsAnswersDto {
  @IsString()
  @IsNotEmpty()
  idQuestion: string;
}
