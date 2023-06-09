import { DeviceType } from '../types/enums/device-type.enum';
import { LocationEnum } from '../types/enums/location.enum';
import { deviceTypes } from '../types/index.types';
import { IDevice } from '../types/interfaces/device.interface';

export class DevicesGetDto implements IDevice {
  location: LocationEnum;
  hamal: number;
  area: number;
  ip: string;
  deviceType: DeviceType;
  device: deviceTypes;
  isAlive: boolean;
  hamalName: string;
}
