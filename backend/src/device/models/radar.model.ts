import { Prop } from '@typegoose/typegoose';

export class RadarModel {
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
  