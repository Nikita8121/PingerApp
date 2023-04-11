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
import {
  BarkanModel,
  KarnatzModel,
  NetzModel,
  AvivModel,
  SpiderModel,
  SecCameraModel,
} from '../models';

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
  const masad = dto.masad || dto.ip[dto.ip.length - 1]; // masad this is the last number of ip
  switch (dto.deviceType) {
    case DeviceType.Karnatz:
      return {
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
      } as KarnatzModel;
    case DeviceType.Barkan:
      return {
        name: 'Barkan',
        sensorNum: masad,
        ComputerIp: dto.ip,
        Mc1: MC + masad + CompressorMC,
        Mc2: MC + masad + Compressor2MC,
        Port: Number(Port + '0' + dto.area + '0' + masad),
        McPort: McPort,
        subMask: SubMask,
        proxyIP: hamals[dto.hamal].proxyIP,
        proxyPort: Number(ProxyPort + '0' + dto.area + '0' + masad),
        DefaultGateway: ip + DefaultGateway,
      } as BarkanModel;
    case DeviceType.Netz:
      return {
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
      } as NetzModel;
    case DeviceType.Aviv:
      return {
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
      } as AvivModel;
    case DeviceType.Spider:
      return {
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
      } as SpiderModel;
    case DeviceType.Radar:
      return {
        name: 'Radar',
        radarNum: masad,
        RadarIp: ip + RadarIP + masad,
        HmiIp: dto.ip,
        Marsport: Number(Port + '0' + masad + RadarIP),
        subMask: SubMask,
        DefaultGateway: ip + DefaultGateway,
      };
    case DeviceType.SecCamera:
      return {
        name: 'secCamera',
        cameraNum: masad,
        CameraIp: ip + Port + masad,
        CameraMc: MC + CameraMc + masad,
        McPort: McPort,
        subMask: SubMask,
        DefaultGateway: ip + DefaultGateway,
      } as SecCameraModel;
    case DeviceType.SecController:
      return {
        name: 'skip for now',
      };
  }
};
