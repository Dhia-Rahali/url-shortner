import { Url } from '@core/classes/url.class';
import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlDocument = Url & Document;

const USchema = SchemaFactory.createForClass(Url);

export const UrlSchema = USchema;
