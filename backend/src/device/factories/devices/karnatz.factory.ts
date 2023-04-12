import { DeviceCreateDto } from '../../dto/device-create.dto';
import { KarnatzEntity } from '../../entities/devices/karnatz.entity';
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

export class KarntatzFactory {
  public static getKarnatzEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): KarnatzEntity {
    return new KarnatzEntity({
      name: 'Karnatz',
      sensorNum: masad,
      ComputerIp: dto.ip,
      ComputerIp2: ip + computerIP2 + masad,
      CompressorIp: ip + Compressor + masad,
      CompressorIp2: ip + Compressor2 + masad,
      CompressorMc: MC + masad + CompressorMC,
      CompressorMc2: MC + masad + Compressor2MC,
      Port: Number(Port + '0' + dto.area + '0' + masad),
      proxyIP: hamals[dto.hamal].proxyIP,
      proxyPort: Number(ProxyPort + '0' + dto.area + '0' + masad),
      McPort: McPort,
      subMask: SubMask,
      DefaultGateway: ip + DefaultGateway,
    });
  }
}
