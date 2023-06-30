import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Company } from '../company/company.entity';
import { User } from '../users/users.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class JobAds {
  @PrimaryGeneratedColumn('uuid')
  id;

  @ManyToOne(() => Company, (company) => company, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  company: Company;

  // @ManyToMany(() => User, (user) => user, {
  //   onDelete: 'SET NULL'
  // })
  // @JoinColumn()
  // candidates: User[];

  @OneToMany(() => Appointment, (appointment) => appointment, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
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
