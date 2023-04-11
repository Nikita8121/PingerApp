import { AvivEntity } from '../entities/aviv.entity';
import { BarkanEntity } from '../entities/barkan.entity';
import { KarnatzEntity } from '../entities/karnatz.entity';
import { NetzEntity } from '../entities/netz.entity';
import { RadarEntity } from '../entities/radar.entity';
import { SecCameraEntity } from '../entities/secCamera.entity';
import { SecControllerEntity } from '../entities/secController.entity';
import { SpiderEntity } from '../entities/spider.entity';

export type deviceEntities =
  | AvivEntity
  | BarkanEntity
  | KarnatzEntity
  | NetzEntity
  | RadarEntity
  | SecCameraEntity
  | SecControllerEntity
  | SpiderEntity;
