import { Prop } from '@typegoose/typegoose';
import { ISecController } from '../types/interfaces/devices';

export class SecControllerModel implements ISecController {
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
