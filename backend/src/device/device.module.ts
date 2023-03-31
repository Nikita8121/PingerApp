import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeviceModel } from './device.model';
import { PingerHelperModule } from 'src/utils/pingerHelper/pingerHelper.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PingerHelperModule,
    ScheduleModule.forRoot(),
    TypegooseModule.forFeature([
      {
        typegooseClass: DeviceModel,
        schemaOptions: {
          collection: 'device',
        },
      },
    ]),
  ],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}
