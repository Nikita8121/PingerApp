import { IBarkan } from '../../types/interfaces/devices';

export class BarkanEntity implements IBarkan {
  name: string;
  sensorNum: number;
  ComputerIp: string;
  Port: number;
  Mc1: string;
  Mc2: string;
  McPort: number;
  subMask: string;
  DefaultGateway: string;
  InstallDate?: number;
  proxyIP: string;
  constructor(barkan: IBarkan) {
    this.name = barkan.name;
    this.sensorNum = barkan.sensorNum;
    this.ComputerIp = barkan.ComputerIp;
    this.Port = barkan.Port;
    this.Mc1 = barkan.Mc1;
    this.Mc2 = barkan.Mc2;
    this.McPort = barkan.McPort;
    this.subMask = barkan.subMask;
    this.DefaultGateway = barkan.DefaultGateway;
    this.InstallDate = barkan.InstallDate;
    this.proxyIP = barkan.proxyIP;
  }
}
