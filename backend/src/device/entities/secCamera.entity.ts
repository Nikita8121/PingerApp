import { ISecCamera } from '../types/interfaces/devices';

export class SecCameraEntity implements ISecCamera {
  name: string;
  cameraNum: number;
  CameraIp: string;
  CameraMc: string;
  McPort: number;
  subMask: string;
  DefaultGateway: string;
  InstallDate?: number;
  constructor(secCamera: ISecCamera) {
    this.name = secCamera.name;
    this.cameraNum = secCamera.cameraNum;
    this.CameraIp = secCamera.CameraIp;
    this.CameraMc = secCamera.CameraMc;
    this.McPort = secCamera.McPort;
    this.subMask = secCamera.subMask;
    this.DefaultGateway = secCamera.DefaultGateway;
    this.InstallDate = secCamera.InstallDate;
  }
}
