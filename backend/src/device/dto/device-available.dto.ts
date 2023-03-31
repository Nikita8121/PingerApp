import { IsNumber, IsEnum, IsOptional } from 'class-validator';
import { DeviceType } from '../enums/device-type.enum';
import { LocationEnum } from '../enums/location.enum';
import { Port } from '../helpers/device.constants';

export class AvailableAddressForDeviceDto {
  @IsEnum(LocationEnum)
  location: LocationEnum;
  @IsNumber()
  hamal: number;
  @IsNumber()
  area: number;
  @IsNumber()
  @IsOptional()
  masad: number;
  @IsEnum(DeviceType)
  deviceType: DeviceType;
  @IsNumber()
  port: number;
}
