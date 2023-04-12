import { DeviceCreateDto } from '../../dto/device-create.dto';
import { NetzEntity } from '../../entities/devices/netz.entity';
import {
  Compressor,
  Compressor2,
  Compressor2MC,
  CompressorMC,
  DefaultGateway,
  hamals,
  KVM,
  Port,
  ProxyPort,
  SubMask,
} from '../../helpers/device.constants';

export class NetzFactory {
  public static getNetzEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): NetzEntity {
    return new NetzEntity({
      name: 'Netz',
      sensorNum: masad,
      IUIp: dto.ip,
      KVM: ip + KVM + masad,
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
