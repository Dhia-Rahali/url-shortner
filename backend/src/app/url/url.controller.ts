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
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @ApiOperation({ summary: 'Shorten a URL' }) 
  @ApiBody({ type: ShortenUrlDto }) 
  @ApiResponse({ status: 201, description: 'URL successfully shortened' })
  @ApiResponse({ status: 400, description: 'Invalid URL provided' })
  async shortenUrl(@Body() shortenUrlDto: ShortenUrlDto) {
    try {
      const { url } = shortenUrlDto;
      return await this.urlService.shortenUrl(url);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':shortUrl')
  @ApiOperation({ summary: 'Return the original URL' }) 
  @ApiParam({ name: 'shortUrl', description: 'The shortened URL identifier' }) 
  @ApiResponse({ status: 200, description: 'Return the original URL' })
  @ApiResponse({ status: 404, description: 'Shortened URL not found' })
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
  @ApiOperation({ summary: 'Get all shortened URLs' }) 
  @ApiResponse({ status: 200, description: 'Returns all shortened URLs' })
  async getAllUrls() {
    try {
      return await this.urlService.getAllUrls();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
