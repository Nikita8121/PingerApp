export interface IRadar {
  name: string;
  radarNum: number;
  RadarIP: string;
  HmiIp: string;
  MarsPort: number;
  subMask: string;
  DefaultGateway: string;
  InstallDate?: number;
}
