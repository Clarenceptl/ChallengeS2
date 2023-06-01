import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class CompanyRevenueOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  revenue: string;

  @OneToMany(() => Company, (company) => company)
  companies: Company[];
}
