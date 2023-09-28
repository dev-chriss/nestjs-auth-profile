import { Model, Types } from 'mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { checkZodiac } from '../utils/zodiacValidator';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async findByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!profile) {
      throw new NotFoundException(`User not found`);
    }
    return profile;
  }

  async updateByUserId(
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    try {
      // assume backend will receive zodiac field from frontend, we need to validate
      const isZodiacMatch: boolean = checkZodiac(
        updateProfileDto.birthday,
        updateProfileDto.zodiac,
      );

      if (!isZodiacMatch) {
        throw new BadRequestException(
          'Zodiac field is not match with the birthday date',
        );
      }
      const profile = await this.profileModel.findOneAndUpdate(
        { userId: new Types.ObjectId(id) },
        updateProfileDto,
        { new: true, runValidators: true },
      );

      if (!profile) {
        throw new NotFoundException(`User not found`);
      }
      return profile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      // assume backend will receive zodiac field from frontend, we need to validate
      const isZodiacMatch: boolean = checkZodiac(
        createProfileDto.birthday,
        createProfileDto.zodiac,
      );

      if (!isZodiacMatch) {
        throw new BadRequestException(
          'Zodiac field is not match with the birthday date',
        );
      }

      const profile = new this.profileModel(createProfileDto);
      return await profile.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileModel.find();
    return profiles;
  }
}
