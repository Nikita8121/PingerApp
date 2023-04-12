import { ISpider } from 'src/device/types/interfaces/devices';

export class SpiderComponentsFactory {
  public static getSpiderComponents(device: ISpider) {
    return {
      Computer: {
        name: 'מחשב1',
        values: {
          ip: device.ComputerIp,
          port: device.Port,
          MC: null,
          portMC: null,
        },
      },
      Compressor1: {
        name: 'דוחס1',
        values: {
          ip: device.CompressorIp,
          port: null,
          MC: device.CompressorMc,
          portMC: device.McPort,
        },
      },
      Compressor2: {
        name: 'דוחס2',
        values: {
          ip: device.CompressorIp2,
          port: null,
          MC: device.CompressorMc2,
          portMC: null,
        },
      },
    };
  }
}
