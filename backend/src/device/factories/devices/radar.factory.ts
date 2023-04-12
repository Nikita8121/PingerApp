import { DeviceCreateDto } from '../../dto/device-create.dto';
import { RadarEntity } from '../../entities/devices/radar.entity';
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
} from '../../helpers/device.constants';

export class RadarFactory {
  public static getRadarEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): RadarEntity {
    return new RadarEntity({
      name: 'Radar',
      radarNum: masad,
      RadarIP: ip + RadarIP + masad,
      HmiIp: dto.ip,
      MarsPort: Number(Port + '0' + masad + RadarIP),
      subMask: SubMask,
      DefaultGateway: ip + DefaultGateway,
    });
  }
}
