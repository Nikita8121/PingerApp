import { ApiProperty } from '@nestjs/swagger';
import { DeviceType } from '../enums/device-type.enum';
import { LocationEnum } from '../enums/location.enum';

class addressesDto {
  [key: string]: string;
}

export class AvailableAddressDto {
  location: LocationEnum;
  hamal: number;
  area: number;
  deviceType: DeviceType;
  @ApiProperty({
    description: `in that field will be object of type - key:value 
    example: {
      ip: 123.123.123.123,
      ip1: 112.13.13.13
    }
    `,
  })
  addresses: addressesDto;
  port?: number;
  masad?: number;
}
