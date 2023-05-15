import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreatedUserRequest, UpdatedUserRequest } from './users.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async createUser(user: CreatedUserRequest) {
    try {
      await this.userRepository.insert(user);
    } catch (error) {
      return error;
    }

    return { success: true, message: 'User created' };
  }

  public async getUsers() {
    return await this.userRepository.find();
  }

  public async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  public async updateUser(id: string, updatedUser: UpdatedUserRequest) {
    return await this.userRepository.update({ id }, updatedUser);
  }

  public async deleteUser(id: string) {
    await this.userRepository.delete({ id });
    return { success: true, message: 'User delete' };
  }
}
