import { LocationEnum, DeviceTypeEnum } from '@/shared/types/index.enums';

export interface IAddDeviceData {
  location: LocationEnum;
  hamal: number;
  area: number;
  deviceType: DeviceTypeEnum;
  port?: number;
  masad?: number;
  ip: string;
}

export interface IFindAvailableAddressData {
  location: LocationEnum;
  hamal: number;
  area: number;
  deviceType: DeviceTypeEnum;
  port: number;
  masad?: number;
}

export interface IFindAvailableAddressResponse {
  location: LocationEnum;
  hamal: number;
  area: number;
  deviceType: DeviceTypeEnum;
  port?: number;
  masad?: number;
  addresses: {
    [key: string]: string;
  };
}

export interface IDevice {
  _id: string;
  location: number;
  hamal: number;
  hamalName: string;
  area: number;
  ip: string;
  port: number;
  deviceType: string;
  device: {
    [key: string]: string;
  };
  isAlive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type componentsType = {
  [key: string]: {
    name: string;
    values: {
      ip: string | null;
      port: number | null;
      MC: string | null;
      portMC: number | null;
    };
  };
};

export type enrichedDeviceType = IDevice & {
  components: componentsType;
};

export interface IArea {
  area: number;
  devices: enrichedDeviceType[];
}

export interface IHamal {
  hamal: number;
  areas: IArea[];
}
