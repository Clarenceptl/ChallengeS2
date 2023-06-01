import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company.entity';
@Entity()
export class CompanySectorOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sector: string;

  @OneToMany(() => Company, (company) => company)
  companies: Company[];
}
