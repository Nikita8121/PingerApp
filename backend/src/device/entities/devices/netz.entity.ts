import { INetz } from '../../types/interfaces/devices';

export class NetzEntity implements INetz {
  name: string;
  sensorNum: number;
  IUIp: string;
  KVM: string;
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
  constructor(netz: INetz) {
    this.name = netz.name;
    this.sensorNum = netz.sensorNum;
    this.IUIp = netz.IUIp;
    this.KVM = netz.KVM;
    this.Port = netz.Port;
    this.CompressorIp = netz.CompressorIp;
    this.CompressorIp2 = netz.CompressorIp2;
    this.CompressorMc = netz.CompressorMc;
    this.CompressorMc2 = netz.CompressorMc2;
    this.McPort = netz.McPort;
    this.subMask = netz.subMask;
    this.DefaultGateway = netz.DefaultGateway;
    this.InstallDate = netz.InstallDate;
    this.proxyIP = netz.proxyIP;
    this.proxyPort = netz.proxyPort;
  }
}
