import { IBarkan } from 'src/device/types/interfaces/devices';

export class BarkanComponentsFactory {
  public static getBarkanComponents(barkan: IBarkan) {
    return {
      Computer: {
        name: 'מחשב1',
        values: {
          ip: barkan.ComputerIp,
          port: barkan.Port,
          MC: null,
          portMC: null,
        },
      },
    };
  }
}
