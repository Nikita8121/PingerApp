import { DeviceType } from '../enums/device-type.enum';
import { LocationEnum } from '../enums/location.enum';
import { deviceTypes } from '../index.types';

export interface IDevice {
  location: LocationEnum;
  hamal: number;
  area: number;
  ip: string;
  deviceType: DeviceType;
  device: deviceTypes;
  isAlive: boolean;
}
