import { mongoose, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

import { DeviceType } from './types/enums/device-type.enum';
import { LocationEnum } from './types/enums/location.enum';
import { deviceTypes } from './types/index.types';
import { IDevice } from './types/interfaces/device.interface';

export interface DeviceModel extends Base {}
export class DeviceModel extends TimeStamps implements IDevice {
  @prop({ type: Number, enum: LocationEnum })
  location: LocationEnum;

  @prop({ required: true })
  hamal: number;

  @prop({ required: true })
  area: number;

  @prop({ required: true })
  ip: string;

  @prop({ type: String, enum: DeviceType })
  deviceType: DeviceType;

  @prop({
    type: mongoose.Schema.Types.Mixed,
    _id: false,
  })
  device: deviceTypes;
  @prop({ type: Boolean })
  isAlive: boolean;
}
