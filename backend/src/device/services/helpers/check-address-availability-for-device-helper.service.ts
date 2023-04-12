import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import {
  AvivModel,
  KarnatzModel,
  NetzModel,
  RadarModel,
  BarkanModel,
  SecCameraModel,
  SpiderModel,
} from '../../models';
import { DeviceType } from '../../types/enums/device-type.enum';
import { IDevice } from '../../types/interfaces/device.interface';
import { DeviceModel } from '../../device.model';
import {
  IAviv,
  IBarkan,
  IKarnatz,
  INetz,
  IRadar,
  ISecCamera,
} from '../../types/interfaces/devices';

import { Injectable } from '@nestjs/common';
@Injectable()
export class CheckAddressAvailabilityHelperService {
  constructor(private readonly pingerHelperService: PingerHelperService) {}

  public async checkAddressAvailability({
    deviceType,
    device,
  }: IDevice): Promise<boolean> {
    let results;
    switch (deviceType) {
      case DeviceType.Aviv:
        device = device as IAviv;
        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.CompressorIp),
          this.pingerHelperService.isHostAlive(device.CompressorIp2),
          this.pingerHelperService.isHostAlive(device.MagicIp),
        ]);
        break;
      case DeviceType.Barkan:
        device = device as IBarkan;

        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.ComputerIp),
        ]);
        break;
      case DeviceType.Karnatz:
        device = device as IKarnatz;
        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.CompressorIp),
          this.pingerHelperService.isHostAlive(device.CompressorIp2),
          this.pingerHelperService.isHostAlive(device.ComputerIp),
          this.pingerHelperService.isHostAlive(
            (device as IKarnatz).ComputerIp2,
          ),
        ]);
        break;
      case DeviceType.Netz:
        device = device as INetz;
        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.IUIp),
          this.pingerHelperService.isHostAlive(device.CompressorIp),
          this.pingerHelperService.isHostAlive(device.CompressorIp2),
        ]);
        break;
      case DeviceType.Radar:
        device = device as IRadar;

        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.RadarIP),
        ]);
        break;
      case DeviceType.SecCamera:
        device = device as ISecCamera;

        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.CameraIp),
        ]);
        break;
      case DeviceType.SecController:
        break;
      case DeviceType.Spider:
        device = device as SpiderModel;

        results = await Promise.all([
          this.pingerHelperService.isHostAlive(device.ComputerIp),
          this.pingerHelperService.isHostAlive(device.CompressorIp),
          this.pingerHelperService.isHostAlive(device.ComputerIp),
        ]);
        break;
    }
    return Object.values(results).some((prop) => prop === true);
  }
}
