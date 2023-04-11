import { ISecController } from '../types/interfaces/devices';

export class SecControllerEntity implements ISecController {
  name: string;
  ip: string;
  subMask: string;
  DefaultGateway: string;
  InstallDate: number;
  constructor(secController: ISecController) {
    this.name = secController.name;
    this.ip = secController.ip;
    this.subMask = secController.subMask;
    this.DefaultGateway = secController.DefaultGateway;
    this.InstallDate = secController.InstallDate;
  }
}
