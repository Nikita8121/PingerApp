import { INetz } from 'src/device/types/interfaces/devices';

export class NetzComponentsFactory {
  public static getNetzComponents(netz: INetz) {
    return {
      IUIp: {
        name: 'IUIp',
        values: {
          ip: netz.IUIp,
          port: netz.Port,
          MC: null,
          portMC: null,
        },
      },
      KVM: {
        name: 'KVM',
        values: {
          ip: netz.KVM,
          port: null,
          MC: null,
          portMC: null,
        },
      },
      Compressor1: {
        name: 'דוחס1',
        values: {
          ip: netz.CompressorIp,
          port: null,
          MC: netz.CompressorMc,
          portMC: netz.McPort,
        },
      },
      Compressor2: {
        name: 'דוחס2',
        values: {
          ip: netz.CompressorIp2,
          port: null,
          MC: netz.CompressorMc2,
          portMC: null,
        },
      },
    };
  }
}
