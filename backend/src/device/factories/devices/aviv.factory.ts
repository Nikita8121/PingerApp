import { DeviceCreateDto } from '../../dto/device-create.dto';
import { AvivEntity } from '../../entities/devices/aviv.entity';
import {
  Compressor,
  Compressor2,
  Compressor2MC,
  CompressorMC,
  DefaultGateway,
  hamals,
  Port,
  ProxyPort,
  SubMask,
} from '../../helpers/device.constants';

export class AvivFactory {
  public static getAvivEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): AvivEntity {
    return new AvivEntity({
      name: 'Aviv',
      sensorNum: masad,
      MagicIp: dto.ip,
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
