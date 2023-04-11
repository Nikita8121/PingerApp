import {

  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DeviceType } from '../types/enums/device-type.enum';
import { LocationEnum } from '../types/enums/location.enum';

export class DeviceCreateDto {
  @IsString()
  ip: string;

  @IsEnum(LocationEnum)
  location: LocationEnum;

  @IsNumber()
  @IsOptional()
  masad: number;

  @IsNumber()
  hamal: number;

  @IsNumber()
  area: number;

  @IsEnum(DeviceType)
  deviceType: DeviceType;
}
