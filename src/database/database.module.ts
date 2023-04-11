import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';
import config from '../config';


@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    uri: configService.MONGO.URI,
                    dbName: configService.MONGO.dbName,
                };
            },
            inject: [config.KEY],
        }),
    ],
    exports: [MongooseModule],

})
export class DatabaseModule {}
