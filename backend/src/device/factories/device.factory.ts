import { DeviceCreateDto } from '../dto/device-create.dto';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceType } from '../types/enums/device-type.enum';
import { deviceEntities } from '../types/index.types';
import { MCPort } from '../helpers/device.constants';
import { KarntatzFactory } from './devices/karnatz.factory';
import { AvivFactory } from './devices/aviv.factory';
import { NetzFactory } from './devices/netz.factory';
import { BarkanFactory } from './devices/barkan.factory';
import { SpiderFactory } from './devices/spider.factory';
import { RadarFactory } from './devices/radar.factory';
import { SecCameraFactory } from './devices/secCamera.factory';

export class DeviceFactory {
  private readonly deviceCreateDto: DeviceCreateDto;
  constructor(deviceCreateDto: DeviceCreateDto) {
    this.deviceCreateDto = deviceCreateDto;
  }

  public getDeviceEntity(): DeviceEntity {
    return new DeviceEntity({
      location: this.deviceCreateDto.location,
      hamal: this.deviceCreateDto.hamal,
      area: this.deviceCreateDto.area,
      ip: this.deviceCreateDto.ip,
      deviceType: this.deviceCreateDto.deviceType,
      device: this.getDevice(),
      isAlive: false,
    });
  }

  private getDevice(): deviceEntities {
    let CompressorMc: string;
    if (this.deviceCreateDto.hamal <= 98) CompressorMc = '235';
    else CompressorMc = '236';
    const MC = `${CompressorMc}.${this.deviceCreateDto.hamal}.${this.deviceCreateDto.area}.`;
    const ip = `${this.deviceCreateDto.location}.${this.deviceCreateDto.hamal}.${this.deviceCreateDto.area}.`;
    const McPort = MCPort + this.deviceCreateDto.area;
    const masad =
      this.deviceCreateDto.masad ||
      parseInt(this.deviceCreateDto.ip[this.deviceCreateDto.ip.length - 1]); // masad this is the last number of ip

    switch (this.deviceCreateDto.deviceType) {
      case DeviceType.Karnatz:
        return KarntatzFactory.getKarnatzEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.Barkan:
        return BarkanFactory.getBarkanEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.Netz:
        return NetzFactory.getNetzEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.Aviv:
        return AvivFactory.getAvivEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.Spider:
        return SpiderFactory.getSpiderEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.Radar:
        return RadarFactory.getRadarEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      case DeviceType.SecCamera:
        return SecCameraFactory.getSecCameraEntity(
          this.deviceCreateDto,
          MC,
          ip,
          McPort,
          masad,
        );
      /* case DeviceType.SecController:
        return {
          name: 'skip for now',
        }; */
    }
  }
}
