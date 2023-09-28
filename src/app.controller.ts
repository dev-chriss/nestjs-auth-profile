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
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
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
          description: `The image to upload [jpg|jpeg|png|gif]. Max size: 1 MB`,
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
  @ApiParam({
    name: 'imageFilename',
    required: true,
    description: 'Image file name',
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @Get('getImage/:imageFilename')
  @Header('content-type', 'image/png')
  @HttpCode(HttpStatus.OK)
  getImage(@Param() payload: any): any {
    return new StreamableFile(
      createReadStream(
        join(process.cwd(), 'public/img', payload.imageFilename),
      ),
    );
  }
}
