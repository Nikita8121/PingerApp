import { Prop } from '@typegoose/typegoose';

export class SecCameraModel {
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
  