import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

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

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
