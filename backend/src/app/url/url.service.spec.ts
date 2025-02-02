/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import { UrlService } from './url.service';

describe('UrlController (e2e)', () => {
  let app: INestApplication;
  let urlService: UrlService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    urlService = moduleFixture.get<UrlService>(UrlService);
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(urlService).toBeDefined();
  });

  it('should shorten a URL', async () => {
    const response = await request(app.getHttpServer())
      .post('/url/shorten')
      .send({ url: 'https://www.google.com' })
      .expect(201);

    expect(response.body).toHaveProperty('shortUrl');
  });

  it('should return original URL', async () => {
    const response = await request(app.getHttpServer())
      .get('/url/shortUrl')
      .expect(200);

    expect(response.body).toHaveProperty('originalUrl');
  });

  it('should return all URLs', async () => {
    const response = await request(app.getHttpServer()).get('/url').expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });
});
