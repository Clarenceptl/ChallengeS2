import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { hash } from 'bcrypt';
type UserRoleType = 'ROLE_USER' | 'ROLE_ADMIN';

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
    default: 'ROLE_USER'
  })
  roles: UserRoleType[];

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

  @BeforeInsert()
  @BeforeUpdate()
  public emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
