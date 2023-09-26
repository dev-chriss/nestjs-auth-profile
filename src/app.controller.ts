import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
