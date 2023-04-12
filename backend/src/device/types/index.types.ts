import { DeviceModel } from '../device.model';
import { AvivEntity } from '../entities/devices/aviv.entity';
import { BarkanEntity } from '../entities/devices/barkan.entity';
import { KarnatzEntity } from '../entities/devices/karnatz.entity';
import { NetzEntity } from '../entities/devices/netz.entity';
import { RadarEntity } from '../entities/devices/radar.entity';
import { SecCameraEntity } from '../entities/devices/secCamera.entity';
import { SecControllerEntity } from '../entities/devices/secController.entity';
import { SpiderEntity } from '../entities/devices/spider.entity';
import { IDevice } from './interfaces/device.interface';
import {
  IAviv,
  IBarkan,
  IKarnatz,
  INetz,
  IRadar,
  ISecCamera,
  ISecController,
  ISpider,
} from './interfaces/devices';

export type deviceEntities =
  | AvivEntity
  | BarkanEntity
  | KarnatzEntity
  | NetzEntity
  | RadarEntity
  | SecCameraEntity
  | SecControllerEntity
  | SpiderEntity;

export type enrichedDeviceType = IDevice & {
  components: {
    [key: string]: {
      name: string;
      values: {
        ip: string | null;
        port: number | null;
        MC: string | null;
        portMC: number | null;
      };
    };
  };
};

export type deviceTypes =
  | IAviv
  | IBarkan
  | IKarnatz
  | INetz
  | IRadar
  | ISecCamera
  | ISecController
  | ISpider;
