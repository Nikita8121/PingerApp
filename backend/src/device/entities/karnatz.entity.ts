import { IKarnatz } from '../types/interfaces/devices';

export class KarnatzEntity implements IKarnatz {
  name: string;
  sensorNum: number;
  ComputerIp: string;
  ComputerIp2: string;
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

  constructor(karnatz: IKarnatz) {
    this.name = karnatz.name;
    this.sensorNum = karnatz.sensorNum;
    this.ComputerIp = karnatz.ComputerIp;
    this.ComputerIp2 = karnatz.ComputerIp2;
    this.Port = karnatz.Port;
    this.CompressorIp = karnatz.CompressorIp;
    this.CompressorIp2 = karnatz.CompressorIp2;
    this.CompressorMc = karnatz.CompressorMc;
    this.CompressorMc2 = karnatz.CompressorMc2;
    this.McPort = karnatz.McPort;
    this.subMask = karnatz.subMask;
    this.DefaultGateway = karnatz.DefaultGateway;
    this.InstallDate = karnatz.InstallDate;
    this.proxyIP = karnatz.proxyIP;
    this.proxyPort = karnatz.proxyPort;
  }
}
