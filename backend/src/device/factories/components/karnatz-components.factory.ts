import { IKarnatz } from 'src/device/types/interfaces/devices';

export class KarnatzComponentsFactory {
  public static getKarnatzComponents(karnatz: IKarnatz) {
    return {
      Computer: {
        name: 'מחשב1',
        values: {
          ip: karnatz.ComputerIp,
          port: karnatz.Port,
          MC: null,
          portMC: null,
        },
      },
      Computer2: {
        name: 'מחשב2',
        values: {
          ip: karnatz.ComputerIp2,
          port: null,
          MC: null,
          portMC: null,
        },
      },
      Compressor1: {
        name: 'דוחס1',
        values: {
          ip: karnatz.CompressorIp,
          port: null,
          MC: karnatz.CompressorMc,
          portMC: karnatz.McPort,
        },
      },
      Compressor2: {
        name: 'דוחס2',
        values: {
          ip: karnatz.CompressorIp2,
          port: null,
          MC: karnatz.CompressorMc2,
          portMC: null,
        },
      },
    };
  }
}
