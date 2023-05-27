import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  website: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    update: true
  })
  description: string;
}
