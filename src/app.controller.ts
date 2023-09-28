import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Header,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { multerOptions } from './utils/uploadImage';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return { imageFilename: file.filename, imagePath: file.path };
  }

  @ApiBearerAuth()
  @Get('getImage')
  @Header('content-type', 'image/jpeg')
  @HttpCode(HttpStatus.OK)
  getImage(@Body() payload: any): any {
    return new StreamableFile(
      createReadStream(
        join(process.cwd(), 'public/img', payload.imageFilename),
      ),
    );
  }
}
