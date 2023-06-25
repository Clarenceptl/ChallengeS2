import {
  Column,
  CreateDateColumn,
  Entity,
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
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    update: true
  })
  name: string;

  @Column({
    type: 'date',
    nullable: false,
    update: true,
    default: () => 'CURRENT_TIMESTAMP'
  })
  creationDate: Date;

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

  @OneToMany(() => User, (user) => user.company, {
    cascade: true,
    onDelete: 'SET NULL'
  })
  employees: User[];

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  founder: string;

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
    (companySizeOptions) => companySizeOptions,
    { nullable: true, onDelete: 'SET NULL' }
  )
  size?: CompanySizeOptions;

  @ManyToOne(
    () => CompanyRevenueOptions,
    (companyRevenueOptions) => companyRevenueOptions,
    { nullable: true, onDelete: 'SET NULL' }
  )
  revenue?: CompanySizeOptions;

  @ManyToOne(
    () => CompanySectorOptions,
    (companySectorOptions) => companySectorOptions,
    { nullable: true, onDelete: 'SET NULL' }
  )
  sector?: CompanySectorOptions;

  @OneToMany(() => JobAds, (jobAds) => jobAds, { cascade: true })
  jobAds?: JobAds[];
}
