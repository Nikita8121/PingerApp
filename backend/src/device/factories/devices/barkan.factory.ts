import { DeviceCreateDto } from '../../dto/device-create.dto';
import { BarkanEntity } from '../../entities/devices/barkan.entity';
import {
  Compressor2MC,
  CompressorMC,
  DefaultGateway,
  hamals,
  Port,
  SubMask,
} from '../../helpers/device.constants';

export class BarkanFactory {
  public static getBarkanEntity(
    dto: DeviceCreateDto,
    MC: string,
    ip: string,
    McPort: number,
    masad: number,
  ): BarkanEntity {
    return new BarkanEntity({
      name: 'Barkan',
      sensorNum: masad,
      ComputerIp: dto.ip,
      Mc1: MC + masad + CompressorMC,
      Mc2: MC + masad + Compressor2MC,
      Port: Number(Port + '0' + dto.area + '0' + masad),
      McPort: McPort,
      subMask: SubMask,
      proxyIP: hamals[dto.hamal].proxyIP,
      DefaultGateway: ip + DefaultGateway,
    });
  }
}
