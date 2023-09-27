import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '../schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

// using fake database in RAM for testing
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model, Types } from 'mongoose';

const createProfileDtoStub: CreateProfileDto = {
  userId: '6512f3ebc4ef8523da20e7ef',
  displayName: 'User Satu',
  gender: 'Male',
  height: 160,
  weight: 50,
  birthday: '1995/6/28',
  zodiac: 'Cancer',
  horoscope: '',
  interests: [],
};

describe('ProfilesController', () => {
  let profileController: ProfilesController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let profileModel: Model<Profile>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    profileModel = mongoConnection.model(Profile.name, ProfileSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        ProfilesService,
        { provide: getModelToken(Profile.name), useValue: profileModel },
      ],
    }).compile();
    profileController = module.get<ProfilesController>(ProfilesController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(profileController).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return the corresponding saved object', async () => {
      await new profileModel(createProfileDtoStub).save();
      const profile = await profileController.findOne(
        createProfileDtoStub.userId,
      );
      expect(profile.userId).toEqual(
        new Types.ObjectId(createProfileDtoStub.userId),
      );
    });

    it('should return User not found', async () => {
      try {
        await profileController.findOne(createProfileDtoStub.userId);
      } catch (e) {
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('createProfile', () => {
    it('should return the new created object', async () => {
      const createdProfile = await profileController.create(
        createProfileDtoStub,
      );
      expect(createdProfile.userId).toEqual(
        new Types.ObjectId(createProfileDtoStub.userId),
      );
    });

    it('should return duplicate key (Bad Request - 400) exception', async () => {
      try {
        await new profileModel(createProfileDtoStub).save();
      } catch (e) {
        expect(e.message).toContain('duplicate key error');
      }
    });
  });

  describe('updateProfile', () => {
    const updateProfileDtoStub: UpdateProfileDto = {
      displayName: 'User Satu',
      gender: 'Male',
      height: 160,
      weight: 50,
      birthday: '1995/6/28',
      zodiac: 'Cancer',
      horoscope: '',
      interests: [],
    };

    it('should return the new updated object', async () => {
      await profileController.create(createProfileDtoStub);
      const updatedProfile = await profileController.update(
        createProfileDtoStub.userId,
        updateProfileDtoStub,
      );
      expect(updatedProfile.userId).toEqual(
        new Types.ObjectId(createProfileDtoStub.userId),
      );
      expect(updatedProfile.displayName).toEqual(
        updateProfileDtoStub.displayName,
      );
    });

    it('should return duplicate key (Bad Request - 400) exception', async () => {
      try {
        await new profileModel(createProfileDtoStub).save();
        await profileController.update(
          createProfileDtoStub.userId,
          updateProfileDtoStub,
        );
      } catch (e) {
        expect(e.message).toContain('duplicate key error');
      }
    });
  });
});
