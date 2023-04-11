import { IAviv } from '../types/interfaces/devices';

export class AvivEntity implements IAviv {
  name: string;
  sensorNum: number;
  MagicIp: string;
  Port: number;
  CompressorIp: string;
  CompressorIp2: string;
  CompressorMc: string;
  CompressorMc2: string;
  McPort: number;
  subMask: string;
  DefaultGateway: string;
  InstallDate?: number;
  proxyIP: string;
  proxyPort: number;
  constructor(aviv: IAviv) {
    this.name = aviv.name;
    this.sensorNum = aviv.sensorNum;
    this.MagicIp = aviv.MagicIp;
    this.Port = aviv.Port;
    this.CompressorIp = aviv.CompressorIp;
    this.CompressorIp2 = aviv.CompressorIp2;
    this.McPort = aviv.McPort;
    this.subMask = aviv.subMask;
    this.DefaultGateway = aviv.DefaultGateway;
    this.InstallDate = aviv.InstallDate;
    this.proxyIP = aviv.proxyIP;
    this.proxyPort = aviv.proxyPort;
  }
}
