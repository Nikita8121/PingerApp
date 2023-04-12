import { ISecCamera } from 'src/device/types/interfaces/devices';

export class SecCameraComponentsFactory {
  public static getSecCameraComponents(device: ISecCamera) {
    return {
      Camera: {
        name: 'מצלמה',
        values: {
          ip: device.CameraIp,
          port: null,
          MC: device.CameraMc,
          portMC: device.McPort,
        },
      },
    };
  }
}
