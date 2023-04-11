import { ISpider } from '../types/interfaces/devices';

export class SpiderEntity implements ISpider {
  name: string;
  sensorNum: number;
  ComputerIp: string;
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
  constructor(spider: ISpider) {
    this.name = spider.name;
    this.sensorNum = spider.sensorNum;
    this.ComputerIp = spider.ComputerIp;
    this.Port = spider.Port;
    this.CompressorIp = spider.CompressorIp;
    this.CompressorIp2 = spider.CompressorIp2;
    this.CompressorMc = spider.CompressorMc;
    this.CompressorMc2 = spider.CompressorMc2;
    this.McPort = spider.McPort;
    this.subMask = spider.subMask;
    this.DefaultGateway = spider.DefaultGateway;
    this.InstallDate = spider.InstallDate;
    this.proxyIP = spider.proxyIP;
    this.proxyPort = spider.proxyPort;
  }
}
