import { Company } from 'src/company/company.entity';
import { CandidatesJobAds } from 'src/entities/candidates-job-ads.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany
} from 'typeorm';

export enum UserRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_EMPLOYEUR = 'ROLE_EMPLOYEUR',
  ROLE_ADMIN = 'ROLE_ADMIN'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
    update: true
  })
  password: string;

  @Column({
    type: 'simple-array',
    nullable: false,
    update: true,
    default: UserRole.ROLE_USER
  })
  roles: UserRole[];

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  birthdate: string;

  @Column({
    type: 'boolean',
    nullable: false,
    update: true,
    default: false
  })
  isVerified: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    update: true,
    default: false
  })
  premium: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    update: true,
    default: null
  })
  token: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: true,
    default: () => 'now()'
  })
  createdAt: string;

  @ManyToOne(() => Company, (company) => company.employees, {
    onDelete: 'SET NULL',
    eager: true
  })
  company: Company | null;

  @OneToMany(
    () => CandidatesJobAds,
    (candidateJobAds) => candidateJobAds.candidate,
    {
      onDelete: 'SET NULL',
      eager: true
    }
  )
  candidatesJobAds: CandidatesJobAds[];

  @BeforeInsert()
  @BeforeUpdate()
  public emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  public getFullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
