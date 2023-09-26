import mongoose, { Model } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
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

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileModel.find();
    return profiles;
  }

  async findOne(id: string) {
    const profile = await this.profileModel.findById(
      new mongoose.Types.ObjectId(id),
    );
    if (!profile) {
      throw new NotFoundException(`Profile not found`);
    }
    return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      // assume backend will receive zodiac field from frontend, we need to validate
      const isZodiacMatch: boolean = checkZodiac(
        createProfileDto.birthday,
        createProfileDto.zodiac,
      );

      if (!isZodiacMatch) {
        throw new InternalServerErrorException(
          'Zodiac field is not match with the birthday date',
        );
      }

      const profile = new this.profileModel(createProfileDto);
      return await profile.save();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(
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
        throw new InternalServerErrorException(
          'Zodiac field is not match with the birthday date',
        );
      }

      const profile = await this.profileModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(id),
        updateProfileDto,
        { new: true, runValidators: true },
      );

      if (!profile) {
        throw new NotFoundException(`Profile not found`);
      }
      return profile;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async remove(id: string) {
    return this.profileModel.findByIdAndRemove(new mongoose.Types.ObjectId(id));
  }
}
