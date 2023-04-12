import { IRadar } from 'src/device/types/interfaces/devices';

export class RadarComponentsFactory {
  public static getRadarComponents(device: IRadar) {
    return {
      Computer: {
        name: 'מחשב1',
        values: {
          ip: device.RadarIP,
          port: null,
          MC: null,
          portMC: device.MarsPort,
        },
      },
    };
  }
}
