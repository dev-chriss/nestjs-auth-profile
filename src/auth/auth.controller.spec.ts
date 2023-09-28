import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

// using database in RAM for testing
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';

const createUserDtoStub: CreateUserDto = {
  username: 'user1',
  email: 'user1@test.com',
  password: '1234',
};

describe('AuthController', () => {
  let authController: AuthController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    mongoConnection = (await connect(mongod.getUri())).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UsersService,
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
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

  describe('login', () => {
    /* it('should return the corresponding user and token', async () => {
      const loginDtoStub: LoginDto = {
        keyword: 'user1',
        password: '1234',
      };

      await authController.register(createUserDtoStub);
      const user = await authController.login(loginDtoStub);
      expect(user.username).toEqual(loginDtoStub.keyword);
    }); */

    it('should return Username or Email is not found', async () => {
      try {
        await authController.register(createUserDtoStub);
        await authController.login({
          keyword: 'wrong username',
          password: '1234',
        });
      } catch (e) {
        expect(e.message).toBe('Username or Email is not found.');
      }
    });

    it('should return Username, Email or Password does not match', async () => {
      try {
        await authController.register(createUserDtoStub);
        await authController.login({
          keyword: 'user1',
          password: 'wrong password',
        });
      } catch (e) {
        expect(e.message).toBe('Username, Email or Password does not match.');
      }
    });
  });

  describe('register', () => {
    it('should return the new created object', async () => {
      const createdUser = await authController.register(createUserDtoStub);
      expect(createdUser.email).toEqual(createUserDtoStub.email);
    });

    it('should return duplicate key (Bad Request - 400) exception', async () => {
      try {
        await new userModel(createUserDtoStub).save();
      } catch (e) {
        expect(e.message).toContain('duplicate key error');
      }
    });
  });
});
