import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDto } from '../src/users/dto/login.dto';
import { CreateUserDto } from '../src/users/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  it('should get a JWT then successfully make a call', async () => {
    const createUserDtoStub: CreateUserDto = {
      username: 'userfake',
      email: 'emailfake@fake.com',
      password: 'passwordfake',
    };

    const loginDtoStub: LoginDto = {
      keyword: 'userfake',
      password: 'passwordfake',
    };

    // delete the existing particular user
    await request(app.getHttpServer())
      .delete('/api/removeUser')
      .send({ username: createUserDtoStub.username });

    // register the user
    await request(app.getHttpServer())
      .post('/api/register')
      .send(createUserDtoStub)
      .expect(201)
      .expect(({ body }) => {
        expect(body.username).toEqual(createUserDtoStub.username);
      });

    // login and get jwt token
    const loginReq = await request(app.getHttpServer())
      .post('/api/login')
      .send(loginDtoStub)
      .expect(200)
      .expect(({ body }) => {
        expect(body.user.username).toEqual(loginDtoStub.keyword);
      });
    const token = loginReq.body.access_token;

    // dont forget to delete this user
    await request(app.getHttpServer())
      .delete('/api/removeUser')
      .send({ username: createUserDtoStub.username });

    // test jwt on guarded end API
    return await request(app.getHttpServer())
      .get('/api/testJwt')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });
});
