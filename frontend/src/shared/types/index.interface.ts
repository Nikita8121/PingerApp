import { DeviceTypeEnum, LocationEnum } from './index.enums';

export interface IPingDevicesData {
  location: LocationEnum;
  hamal: number;
  numberOfFirstArea: number;
  numberOfLastArea?: number;
}

export interface IPingDevicesMessage {
  ip: string;
  isAlive: boolean;
}

export interface IDeviceFilterProperties {
  isAlive?: boolean;
  deviceType?: DeviceTypeEnum;
  location?: LocationEnum;
  hamal?: number;
  area?: number;
}
