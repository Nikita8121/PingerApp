import { mongoose, prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

import { DeviceType } from './enums/device-type.enum';
import {
  AvivModel,
  BarkanModel,
  KarnatzModel,
  NetzModel,
  RadarModel,
  SecCameraModel,
  SecControllerModel,
  SpiderModel,
} from './models';
import { LocationEnum } from './enums/location.enum';

// #region shit code, need changes
type devicesTypes =
  | AvivModel
  | BarkanModel
  | KarnatzModel
  | NetzModel
  | RadarModel
  | SecCameraModel
  | SecControllerModel
  | SpiderModel;

const devicesTypes =
  AvivModel ||
  BarkanModel ||
  KarnatzModel ||
  NetzModel ||
  RadarModel ||
  SecCameraModel ||
  SecControllerModel ||
  SpiderModel;

//#endregion

export interface DeviceModel extends Base {}
export class DeviceModel extends TimeStamps {

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
  device: devicesTypes;
  @prop({ type: Boolean })
  isAlive: boolean;
}
