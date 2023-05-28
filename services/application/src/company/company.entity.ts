import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../users/users.entity';
import { CompanyRevenueOptions } from '../company-revenue-options/company-revenue-options.entity';
import { CompanySizeOptions } from '../company-size-options/company-size-option.entity';
import { CompanySectorOptions } from '../company-sector-options/company-sector-options.entity';
import { JobAds } from '../job-ads/job-ads.entity';
import { Appointment } from '../appointment/appointment.entity';
@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    update: true
  })
  name: string;

  @Column({
    type: 'datetime',
    nullable: false,
    update: true,
    default: () => 'CURRENT_TIMESTAMP'
  })
  creationDate: Date = null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    update: true
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    update: true
  })
  website: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    update: true
  })
  description: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn()
  founder?: User;

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

  @Column({
    type: 'bigint',
    nullable: true,
    update: true
  })
  siret: number;

  @ManyToOne(
    () => CompanySizeOptions,
    (companySizeOptions) => companySizeOptions
  )
  @JoinColumn()
  size?: CompanySizeOptions;

  @ManyToOne(
    () => CompanyRevenueOptions,
    (companyRevenueOptions) => companyRevenueOptions
  )
  @JoinColumn()
  revenue?: CompanySizeOptions;

  @OneToMany(
    () => CompanySectorOptions,
    (companySectorOptions) => companySectorOptions
  )
  @JoinColumn()
  sector?: CompanySectorOptions;

  @OneToMany(() => JobAds, (jobAds) => jobAds)
  @JoinColumn()
  jobAds?: JobAds[];
}
