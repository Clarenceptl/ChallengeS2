import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

import { User } from '../users/users.entity';
import { JobAds } from '../job-ads/job-ads.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'SET NULL',
    nullable: false,
    eager: true
  })
  @JoinColumn({
    name: 'candidateId'
  })
  candidate: User;

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'SET NULL',
    nullable: false,
    eager: true
  })
  @JoinColumn({
    name: 'employeeId'
  })
  employee: User;

  @ManyToOne(() => JobAds, (job) => job, {
    eager: true
  })
  job: JobAds;

  @Column({
    type: 'timestamp',
    nullable: false
  })
  time: Date;

  @Column({
    type: 'boolean',
    nullable: true,
    default: null
  })
  accepted: boolean;
}
