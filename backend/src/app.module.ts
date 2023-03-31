import { AddressModule } from './address/address.module';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeviceModule } from './device/device.module';
import { getMongoConfig } from './configs/mongo.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /* TypegooseModule.forRoot(`mongodb://${process.env.DATABASE_URL}`),  */
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    DeviceModule,
    AddressModule,
  ],
})
export class AppModule {}
