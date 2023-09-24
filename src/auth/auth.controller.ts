/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.OK, description: `return user data and token` })
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiResponse({ status: HttpStatus.CREATED, description: `return user data` })
  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
