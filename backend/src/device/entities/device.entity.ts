import { DeviceType } from '../types/enums/device-type.enum';
import { LocationEnum } from '../types/enums/location.enum';
import { deviceTypes } from '../types/index.types';
import { IDevice } from '../types/interfaces/device.interface';

export class DeviceEntity implements IDevice {
  location: LocationEnum;
  hamal: number;
  area: number;
  ip: string;
  deviceType: DeviceType;
  device: deviceTypes;
  isAlive: boolean;
  constructor(device: IDevice) {
    this.location = device.location;
    this.hamal = device.hamal;
    this.area = device.area;
    this.ip = device.ip;
    this.deviceType = device.deviceType;
    this.device = device.device;
    this.isAlive = device.isAlive;
  }
}
