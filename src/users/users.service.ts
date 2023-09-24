import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const user = await this.userModel.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashPassword,
      });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async find(keyword: string): Promise<User | undefined> {
    try {
      if (!keyword) {
        throw new InternalServerErrorException(
          `Username or Email is required.`,
        );
      }
      // username and email is unique fields, there will be no duplication
      const result = this.userModel.findOne({
        $or: [{ username: keyword }, { email: keyword }],
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
