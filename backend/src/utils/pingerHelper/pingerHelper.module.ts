import { Module } from '@nestjs/common';
import { PingerHelperService } from './pingerHelper.service';

@Module({
  providers: [PingerHelperService],
  exports: [PingerHelperService],
})
export class PingerHelperModule {}
