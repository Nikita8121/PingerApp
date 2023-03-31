import { DeviceModel } from 'src/device/device.model';

export type enrichedDeviceType = DeviceModel & {
  components: {
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
};

export interface IAtar {
  area: number;
  devices: enrichedDeviceType[];
}

export interface IHamal {
  hamal: number;
  areas: IAtar[];
}
