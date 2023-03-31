/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { AddressesPingDto } from './dto/address-ping.dto';
import { PingResultDto } from './dto/ping-result.dto';
import { pingAddresses } from './helpers/ping-addresses';

@Injectable()
export class AddressService {
  constructor(private readonly pingerHelperService: PingerHelperService) {}

  async getPingAddressesResults(
    dto: AddressesPingDto,
    onPingSucceed: (data: PingResultDto) => void,
  ): Promise<void> {
    const { location, hamal, numberOfLastArea, numberOfFirstArea } = dto;
    let ipWithoutAreaAndLastNumber = `${location}.${hamal}.`;

    let areaNum = numberOfFirstArea;
    const numberToLoop = numberOfLastArea || numberOfFirstArea;

    do {
      const ipWithoutDeviceNum = `${ipWithoutAreaAndLastNumber}${areaNum}.`;

      await pingAddresses(
        ipWithoutDeviceNum,
        onPingSucceed,
        this.pingerHelperService,
      );

      areaNum++;
    } while (areaNum <= numberToLoop);
  }
}
