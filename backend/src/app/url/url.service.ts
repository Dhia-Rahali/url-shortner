/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Url } from '@core/classes/url.class';
import { UrlDocument } from '@core/schemas/url.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shortenUrl(originalUrl: string): Promise<Url> {
    try {
      const shortUrl = shortid.generate();

      const url = new this.urlModel({
        originalUrl,
        shortUrl,
        clicks: 0, // Ensure clicks are initialized to 0
      });

      await url.save();

      return await this.urlModel
        .findOne(
          { shortUrl },
          { _id: 0, originalUrl: 1, shortUrl: 1, clicks: 1 },
        )
        .exec();
    } catch (error) {
      throw new BadRequestException(
        'An error occurred while shortening the URL.',
      );
    }
  }

  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    try {
      const url = await this.urlModel
        .findOneAndUpdate({ shortUrl }, { $inc: { clicks: 1 } }, { new: true })
        .exec();

      if (!url) {
        throw new NotFoundException('Shortened URL not found.');
      }

      return url.originalUrl;
    } catch (error) {
      throw new BadRequestException('Error retrieving original URL.');
    }
  }

  async getAllUrls(): Promise<
    { originalUrl: string; shortUrl: string; clicks: number }[]
  > {
    try {
      return await this.urlModel
        .find({}, { _id: 0, originalUrl: 1, shortUrl: 1, clicks: 1 })
        .exec();
    } catch (error) {
      throw new BadRequestException('Error retrieving URLs from the database.');
    }
  }
}
