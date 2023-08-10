import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { JobAds } from 'src/job-ads/job-ads.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export enum STATUS {
  INIT = 'INIT',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

@Entity()
export class CandidatesJobAds {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    update: true,
    default: STATUS.INIT
  })
  status: STATUS;

  @ManyToOne(() => User, (user) => user.candidatesJobAds, {
    onDelete: 'SET NULL'
  })
  candidate: User;

  @ManyToOne(() => JobAds, (jobAds) => jobAds.candidatesJobAds, {
    onDelete: 'SET NULL',
    eager: true
  })
  jobAds: JobAds;
}

export class UpdateStatusDTO {
  @IsNotEmpty()
  tokenUser: User;

  @IsNotEmpty()
  @IsString()
  status: STATUS;

  @IsNotEmpty()
  @IsString()
  id: string;
}
