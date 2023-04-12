import { ISecController } from 'src/device/types/interfaces/devices';

export class SecControllerFactory {
  public static getSecControllerComponents(device: ISecController) {
    return {
      controller: {
        name: '',
        values: {
          ip: device.ip,
          port: null,
          MC: null,
          portMC: null,
        },
      },
    };
  }
}
