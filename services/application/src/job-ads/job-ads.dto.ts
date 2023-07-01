import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CreateJobAdsRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  contractType: any;

  @IsNotEmpty()
  salary: number;

  company: any;

  @IsNotEmpty()
  createdAt?: Date;

  @IsNotEmpty()
  updatedAt?: Date;

  applicants: User[];
}
