import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Company } from '../company/company.entity';
import { Appointment } from '../appointment/appointment.entity';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';

@Entity()
export class JobAds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    update: true
  })
  title: string;

  @Column({
    type: 'text',
    update: true
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    update: true
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    update: true
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 15,
    update: true
  })
  contractType: string;

  @Column({
    type: 'int',
    update: true
  })
  salary: number;

  @ManyToOne(() => Company, (company) => company, {
    onDelete: 'SET NULL',
    eager: true
  })
  company: Company;

  @OneToMany(
    () => CandidatesJobAds,
    (candidatesJobAds) => candidatesJobAds.jobAds,
    {
      onDelete: 'SET NULL',
      cascade: true
    }
  )
  candidatesJobAds: CandidatesJobAds[];

  @OneToMany(() => Appointment, (appointment) => appointment)
  appointments: Appointment[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public updated_at: Date;
}
