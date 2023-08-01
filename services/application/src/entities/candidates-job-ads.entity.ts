import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { JobAds } from 'src/job-ads/job-ads.entity';

export enum STATUS {
  INIT = 'INIT',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

@Entity()
export class CandidatesJobAds {
  @PrimaryGeneratedColumn()
  id: number;

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

  //   @CreateDateColumn({
  //     type: 'timestamp',
  //     default: () => 'CURRENT_TIMESTAMP(6)'
  //   })
  //   public created_at: Date;

  //   @UpdateDateColumn({
  //     type: 'timestamp',
  //     default: () => 'CURRENT_TIMESTAMP(6)',
  //     onUpdate: 'CURRENT_TIMESTAMP(6)'
  //   })
  //   public updated_at: Date;
}
