/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from '@core/dto/shorten-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async shortenUrl(@Body() shortenUrlDto: ShortenUrlDto) {
    try {
      const { url } = shortenUrlDto;
      return await this.urlService.shortenUrl(url);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':shortUrl')
  async getUrl(@Param('shortUrl') shortUrl: string) {
    try {
      const originalUrl = await this.urlService.getOriginalUrl(shortUrl);

      if (!originalUrl) {
        throw new NotFoundException('Shortened URL not found.');
      }

      return originalUrl;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAllUrls() {
    try {
      return await this.urlService.getAllUrls();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
