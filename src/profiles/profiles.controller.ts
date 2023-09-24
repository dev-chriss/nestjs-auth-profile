/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('api')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'profile id', 
  })
  @ApiResponse({ status: HttpStatus.OK, description: `return profile data` })
  @Get('getProfile/:id')
  findOne(@Param() id: string) {
    return this.profilesService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.CREATED, description: `return profile data` })
  @Post('createProfile')
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'profile id', 
  })
  @ApiResponse({ status: HttpStatus.OK, description: `return profile data` })
  @Put('updateProfile/:id')
  update(@Param() id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }
}
