import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company.entity';
@Entity()
export class CompanySizeOptions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @OneToMany(() => Company, (company) => company)
  companies: Company[];
}
