import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env, loadEnv } from '@env';


loadEnv()
console.log('MONGO_DB_LINK',env.MONGO_DB_LINK)
@Module({
    imports: [
      MongooseModule.forRoot(env.MONGO_DB_LINK, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        autoIndex: true,
      }),

    ],
  })
  export class DatabaseModule {}
