import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url } from '@core/classes/url.class';
import { UrlSchema } from '@core/schemas/url.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Url.name, schema: UrlSchema },
  ])],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule { }
