import { AddressService } from './address.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PingerHelperModule } from 'src/utils/pingerHelper/pingerHelper.module';
import { AddressGateway } from './address.gateway';

@Module({
  imports: [PingerHelperModule],
  controllers: [],
  providers: [AddressService, AddressGateway],
})
export class AddressModule {}
