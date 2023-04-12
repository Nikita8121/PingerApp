import { DeviceCreateDto } from '../../dto/device-create.dto';
import { SpiderEntity } from '../../entities/devices/spider.entity';
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

export class SpiderFactory {
  public static getSpiderEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): SpiderEntity {
    return new SpiderEntity({
      name: 'Spider',
      sensorNum: masad,
      ComputerIp: dto.ip,
      Port: Number(Port + '0' + dto.area + '0' + masad),
      CompressorIp: ip + Compressor + masad,
      CompressorIp2: ip + Compressor2 + masad,
      CompressorMc: MC + masad + CompressorMC,
      CompressorMc2: MC + masad + Compressor2MC,
      McPort: McPort,
      subMask: SubMask,
      DefaultGateway: ip + DefaultGateway,
      proxyIP: hamals[dto.hamal].proxyIP,
      proxyPort: Number(ProxyPort + '0' + dto.area + '0' + masad),
    });
  }
}
