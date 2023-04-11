import { Prop } from '@typegoose/typegoose';
import { IRadar } from '../types/interfaces/devices';

export class RadarModel implements IRadar {
  @Prop()
  name: string;
  @Prop()
  radarNum: number;
  @Prop()
  RadarIP: string;
  @Prop()
  HmiIp: string;
  @Prop()
  MarsPort: number;
  @Prop()
  subMask: string;
  @Prop()
  DefaultGateway: string;
  @Prop()
  InstallDate?: number;
}
