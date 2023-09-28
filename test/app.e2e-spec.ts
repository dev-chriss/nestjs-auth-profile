import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { LoginDto } from '../src/users/dto/login.dto';

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
    const loginDtoStub: LoginDto = {
      keyword: 'user1',
      password: '1234',
    };

    const loginReq = await request(app.getHttpServer())
      .post('/api/login')
      .send(loginDtoStub)
      .expect(200)
      .expect(({ body }) => {
        // expect(body.access_token).;
        expect(body.user.username).toEqual(loginDtoStub.keyword);
      });

    const token = loginReq.body.access_token;
    return request(app.getHttpServer())
      .get('/api/testJwt')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });
});
