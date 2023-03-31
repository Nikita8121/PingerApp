import { Prop } from '@typegoose/typegoose';

export class SecControllerModel {
    @Prop()
    name: string;
    @Prop()
    ip: string;
    @Prop()
    subMask: string;
    @Prop()
    DefaultGateway: string;
    @Prop()
    InstallDate: number;
  }