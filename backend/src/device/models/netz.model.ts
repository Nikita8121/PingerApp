import { Prop } from '@typegoose/typegoose';
import { INetz } from '../types/interfaces/devices';

export class NetzModel implements INetz {
  @Prop()
  name: string;
  @Prop()
  sensorNum: number;
  @Prop()
  IUIp: string;
  @Prop()
  KVM: string;
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
