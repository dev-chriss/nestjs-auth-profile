import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { Profile } from '../schemas/profile.schema';
import mongoose from 'mongoose';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

const mockProfile = (id: string): Profile => {
  return {
    userId: new mongoose.Schema.Types.ObjectId(id),
    displayName: 'User Satu',
    gender: 'Male',
    height: 160,
    weight: 50,
    birthday: '1995/6/28',
    zodiac: 'Cancer',
    horoscope: '',
    interests: [],
  };
};

class serviceMock {
  findByUserId = (id: string): Profile => {
    return mockProfile(id);
  };

  updateByUserId = (
    id: string,
    updateProfileDto: UpdateProfileDto,
  ): Profile => {
    return updateProfileDto as Profile;
  };

  create = (createProfileDto: CreateProfileDto): Profile => {
    const newData: Profile = {
      userId: new mongoose.Schema.Types.ObjectId(createProfileDto.userId),
      displayName: createProfileDto.displayName,
      gender: createProfileDto.gender,
      height: createProfileDto.height,
      weight: createProfileDto.weight,
      birthday: createProfileDto.birthday,
      zodiac: createProfileDto.zodiac,
      horoscope: createProfileDto.horoscope,
      interests: createProfileDto.interests,
    };
    return newData;
  };
}

describe('ProfilesService', () => {
  let profileService: ProfilesService;

  beforeAll(async () => {
    const serviceProvider = {
      provide: ProfilesService,
      useClass: serviceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilesService, serviceProvider],
    }).compile();

    profileService = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(profileService).toBeDefined();
  });

  it('should foundOne by ID', async () => {
    const userId = '6512f3ebc4ef8523da20e7ef';
    const expectedResult: Profile = {
      userId: new mongoose.Schema.Types.ObjectId(userId),
      displayName: 'User Satu',
      gender: 'Male',
      height: 160,
      weight: 50,
      birthday: '1995/6/28',
      zodiac: 'Cancer',
      horoscope: '',
      interests: [],
    };
    const received = await profileService.findByUserId(userId as string);
    expect(received).toEqual(expectedResult);
  });

  it('should updateOne by ID', async () => {
    const userId = '6512f3ebc4ef8523da20e7ef';
    const expectedResult: Profile = {
      userId: new mongoose.Schema.Types.ObjectId(userId),
      displayName: 'User Satu',
      gender: 'Male',
      height: 160,
      weight: 50,
      birthday: '1995/6/28',
      zodiac: 'Cancer',
      horoscope: '',
      interests: [],
    };
    const received = await profileService.updateByUserId(
      userId as string,
      expectedResult as UpdateProfileDto,
    );
    expect(received).toEqual(expectedResult);
  });

  it('should create new Profile', async () => {
    const userId = '6512f3ebc4ef8523da20e7ef';

    const input: CreateProfileDto = {
      userId,
      displayName: 'User Satu',
      gender: 'Male',
      height: 160,
      weight: 50,
      birthday: '1995/6/28',
      zodiac: 'Cancer',
      horoscope: '',
      interests: [],
    };

    const expectedResult: Profile = {
      userId: new mongoose.Schema.Types.ObjectId(userId),
      displayName: 'User Satu',
      gender: 'Male',
      height: 160,
      weight: 50,
      birthday: '1995/6/28',
      zodiac: 'Cancer',
      horoscope: '',
      interests: [],
    };

    const received = await profileService.create(input);
    expect(received).toEqual(expectedResult);
  });
});
