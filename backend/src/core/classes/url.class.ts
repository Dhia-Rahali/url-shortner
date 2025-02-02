import { Prop, Schema } from '@nestjs/mongoose';


@Schema({ timestamps: true })
export class Url {
    @Prop({ required: true })
    originalUrl: string;
  
    @Prop({ required: true, unique: true })
    shortUrl: string;

    @Prop({ default: 0 }) // Default clicks to 0
    clicks: number;

}