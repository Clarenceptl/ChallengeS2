import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  candidate: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  job: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    update: true
  })
  time: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    update: true
  })
  accepted: boolean;
}
