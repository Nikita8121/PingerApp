import { Prop } from '@typegoose/typegoose';

export class KarnatzModel {
  @Prop()
  name: string;
  @Prop()
  sensorNum: number;
  @Prop()
  ComputerIp: string;
  @Prop()
  ComputerIp2: string;
  @Prop()
  Port: number;
  @Prop()
  CompressorIp: string;
  @Prop()
  CompressorIp2: string;
  @Prop()
  CompressorMc: string;
  @Prop()
  CompressorMc2: string;
  @Prop()
  McPort: number;
  @Prop()
  subMask: string;
  @Prop()
  DefaultGateway: string;
  @Prop()
  InstallDate?: number;
  @Prop()
  proxyIP: string;
  @Prop()
  proxyPort: number;
}
