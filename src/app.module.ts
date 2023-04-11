import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi';
import config from './config';
import { environment } from './enviroments';
import { DatabaseModule } from './database/database.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        TITLE: Joi.string().required(),
        MONGO_URI: Joi.string().required(),
      }),
    }),

  //  MongooseModule.forRoot('mongodb://root:root_password@mongodb:27017/?authMechanism=DEFAULT'),
    StoreModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
