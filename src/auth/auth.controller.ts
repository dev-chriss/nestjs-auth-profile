/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpStatus, Get, HttpCode, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from '../users/dto/login.dto';
import { ApiExcludeEndpoint, ApiResponse } from '@nestjs/swagger';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.OK, description: `return user data and token` })
  @Public()
  @HttpCode(200)
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

  /* just for testing */
  @ApiExcludeEndpoint()
  @Public()
  @HttpCode(200)
  @Delete('removeUser')
  removeUser(@Body() payload: any) {
    return this.authService.removeUser(payload.username);
  }

  /* just for testing */
  @ApiExcludeEndpoint()
  @HttpCode(200)
  @Get('testJwt')
  testJwt() {
    return this.authService.testJwt();
  }

  /*
  @Get('getUsers')
  findAll() {
    return this.authService.findAll();
  } */
}
