import { prop } from '@typegoose/typegoose';

export class BarkanModel {
  @prop({ required: true })
  name: string;
  @prop()
  sensorNum: number;
  @prop()
  ComputerIp: string;
  @prop()
  Port: number;
  @prop()
  Mc1: string;
  @prop()
  Mc2: string;
  @prop()
  McPort: number;
  @prop()
  subMask: string;
  @prop()
  DefaultGateway: string;
  @prop()
  InstallDate?: number;
  @prop()
  proxyIP: string;
}
