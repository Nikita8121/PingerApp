import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceController } from './device.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeviceModel } from './device.model';
import { PingerHelperModule } from 'src/utils/pingerHelper/pingerHelper.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CheckAddressAvailabilityHelperService } from './services/helpers/check-address-availability-for-device-helper.service';
import { DeviceRepository } from './device.repository';
import { FindAvailAddressForDeviceHelperService } from './services/helpers/find-available-address-for-device.service';

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
  providers: [
    DeviceService,
    DeviceRepository,
    CheckAddressAvailabilityHelperService,
    FindAvailAddressForDeviceHelperService,
  ],
  controllers: [DeviceController],
})
export class DeviceModule {}
