import { Prop } from '@typegoose/typegoose';
import { ISecCamera } from '../types/interfaces/devices';

export class SecCameraModel implements ISecCamera {
  @Prop()
  name: string;
  @Prop()
  cameraNum: number;
  @Prop()
  CameraIp: string;
  @Prop()
  CameraMc: string;
  @Prop()
  McPort: number;
  @Prop()
  subMask: string;
  @Prop()
  DefaultGateway: string;
  @Prop()
  InstallDate?: number;
}
