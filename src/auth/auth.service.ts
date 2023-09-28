import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.find(loginDto.keyword);
    if (!user) {
      throw new NotFoundException('Username or Email is not found.');
    }

    const passwordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new NotFoundException(
        'Username, Email or Password does not match.',
      );
    }

    const payload = { sub: user, username: user.username };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
