import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should shorten a URL', async () => {
    const response = await controller.shortenUrl({
      url: 'https://www.google.com',
    });
    expect(response).toHaveProperty('shortUrl');
  });

  it('should return original URL', async () => {
    const response = await controller.getUrl('shortUrl');
    expect(response).toHaveProperty('originalUrl');
  });

  it('should return all URLs', async () => {
    const response = await controller.getAllUrls();
    expect(response).toBeInstanceOf(Array);
  });

  afterEach(async () => {});

  afterAll(async () => {});
});
