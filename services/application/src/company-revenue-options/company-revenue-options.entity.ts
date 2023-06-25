import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository
} from 'typeorm';
import { Company } from '../company/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Entity()
export class CompanyRevenueOptions {
  constructor(
    @InjectRepository(CompanyRevenueOptions)
    private readonly companyRevenueRepository: Repository<CompanyRevenueOptions>
  ) {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  revenue: string;

  @OneToMany(() => Company, (company) => company, {
    onDelete: 'SET NULL'
  })
  companies: Company[] | null;
}
