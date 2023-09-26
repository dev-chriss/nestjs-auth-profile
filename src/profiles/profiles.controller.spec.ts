import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile } from '../schemas/profile.schema';

describe('ProfilesController', () => {
  let controller: ProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      // providers: [ProfilesService],
      providers: [
        ProfilesService,
        { provide: getModelToken(Profile.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
