import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  idJobAds: string;

  @IsString()
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
  @IsString()
  @IsNotEmpty()
  @Min(5) // 5 seconds
  @Max(300) // 5 minutes
  tempsParQuestionSecond: number;
}

export class CreateQuestionsAnswersDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  correct: string;

  @IsNotEmpty()
  answers: Answers[];
}

export class Answers {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}
