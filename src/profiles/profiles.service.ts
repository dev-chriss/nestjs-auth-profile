import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from '../schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const createdProfile = new this.profileModel(createProfileDto);
    return await createdProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    const profiles = await this.profileModel.find();
    return profiles;
  }

  async findAllGroupbyCompany() {
    const teams = await this.profileModel.aggregate([
      {
        $group: {
          _id: '$companyId',
          teams: { $push: '$$ROOT' },
          // count: { $sum: 1 } // this means that the count will increment by 1
        },
      },
    ]);
    return teams;
  }
}
