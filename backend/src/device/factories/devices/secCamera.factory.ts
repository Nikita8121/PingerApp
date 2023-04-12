import { DeviceCreateDto } from '../../dto/device-create.dto';
import { SecCameraEntity } from '../../entities/devices/secCamera.entity';
import {
  CameraMc,
  DefaultGateway,
  Port,
  SubMask,
} from '../../helpers/device.constants';

export class SecCameraFactory {
  public static getSecCameraEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): SecCameraEntity {
    return {
      name: 'secCamera',
      cameraNum: masad,
      CameraIp: ip + Port + masad,
      CameraMc: MC + CameraMc + masad,
      McPort: McPort,
      subMask: SubMask,
      DefaultGateway: ip + DefaultGateway,
    };
  }
}
