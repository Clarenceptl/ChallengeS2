import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/users.entity';
import { JobAds } from '../job-ads/job-ads.entity';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user)
  candidate?: User;

  @ManyToOne(() => JobAds, (job) => job)
  job: JobAds;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: true
  })
  time: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    update: true
  })
  accepted: boolean;
}
