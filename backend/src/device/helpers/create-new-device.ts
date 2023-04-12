import { DeviceType } from '../types/enums/device-type.enum';
import { DeviceCreateDto } from '../dto/device-create.dto';
import {
  CameraMc,
  Compressor,
  Compressor2,
  Compressor2MC,
  CompressorMC,
  computerIP2,
  DefaultGateway,
  hamals,
  KVM,
  MCPort,
  Port,
  ProxyPort,
  RadarIP,
  SubMask,
} from './device.constants';
import { AvivFactory } from '../factories/devices/aviv.factory';
import { BarkanFactory } from '../factories/devices/barkan.factory';
import { KarntatzFactory } from '../factories/devices/karnatz.factory';
import { NetzFactory } from '../factories/devices/netz.factory';
import { RadarFactory } from '../factories/devices/radar.factory';
import { SecCameraFactory } from '../factories/devices/secCamera.factory';
import { SpiderFactory } from '../factories/devices/spider.factory';

/**
 * @param dto values of a new device
 * @returns the needed cords for each device
 */
export const createDevice = async (dto: DeviceCreateDto) => {
  let CompressorMc: string;
  if (dto.hamal <= 98) CompressorMc = '235';
  else CompressorMc = '236';
  const MC = `${CompressorMc}.${dto.hamal}.${dto.area}.`;
  const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;
  const McPort = MCPort + dto.area;
  const masad = dto.masad || parseInt(dto.ip[dto.ip.length - 1]); // masad this is the last number of ip
  switch (dto.deviceType) {
    case DeviceType.Karnatz:
      return KarntatzFactory.getKarnatzEntity(dto, MC, ip, McPort, masad);
    case DeviceType.Barkan:
      return BarkanFactory.getBarkanEntity(dto, MC, ip, McPort, masad);
    case DeviceType.Netz:
      return NetzFactory.getNetzEntity(dto, MC, ip, McPort, masad);
    case DeviceType.Aviv:
      return AvivFactory.getAvivEntity(dto, MC, ip, McPort, masad);
    case DeviceType.Spider:
      return SpiderFactory.getSpiderEntity(dto, MC, ip, McPort, masad);
    case DeviceType.Radar:
      return RadarFactory.getRadarEntity(dto, MC, ip, McPort, masad);
    case DeviceType.SecCamera:
      return SecCameraFactory.getSecCameraEntity(dto, MC, ip, McPort, masad);
    case DeviceType.SecController:
      return {
        name: 'skip for now',
      };
  }
};
