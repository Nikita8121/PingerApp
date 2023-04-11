import { IRadar } from '../types/interfaces/devices';

export class RadarEntity implements IRadar {
  name: string;
  radarNum: number;
  RadarIP: string;
  HmiIp: string;
  MarsPort: number;
  subMask: string;
  DefaultGateway: string;
  InstallDate?: number;
  constructor(radar: IRadar) {
    this.name = radar.name;
    this.radarNum = radar.radarNum;
    this.RadarIP = radar.RadarIP;
    this.HmiIp = radar.HmiIp;
    this.MarsPort = radar.MarsPort;
    this.subMask = radar.subMask;
    this.DefaultGateway = radar.DefaultGateway;
    this.InstallDate = radar.InstallDate;
  }
}
