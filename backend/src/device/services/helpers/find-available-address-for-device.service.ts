import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { AvailableAddressForDeviceDto } from '../../dto/device-available.dto';
import {
  Compressor,
  Compressor2,
  computerIP2,
  Port,
  RadarIP,
} from '../../helpers/device.constants';
import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../../device.repository';
import { DeviceType } from 'src/device/types/enums/device-type.enum';

const amountOfDevices = 9;

@Injectable()
export class FindAvailAddressForDeviceHelperService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly pingerService: PingerHelperService,
  ) {}

  public async findAvailAddressForDevice(
    dto: AvailableAddressForDeviceDto,
  ): Promise<{
    [key: string]: string;
  }> {
    switch (dto.deviceType) {
      case DeviceType.Aviv:
        return await this.findAvailableAddressForAviv(dto);
      case DeviceType.Barkan:
        return await this.findAvailableAddressForBarkan(dto);
      case DeviceType.Karnatz:
        return await this.findAvailableAddressForKarnatz(dto);
      case DeviceType.Netz:
        return await this.findAvailableAddressForNetz(dto);
      case DeviceType.Radar:
        return await this.findAvailableAddressForRadar(dto);
      case DeviceType.SecCamera:
        return await this.findAvailableAddressForSecCamera(dto);
      case DeviceType.SecController:
        return;
      case DeviceType.Spider:
        return await this.findAvailableAddressForSpider(dto);
    }
  }

  private isAddressAvailableForSpivivtz = async (
    ip: string,
    masad: number,
  ): Promise<boolean> => {
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;

    const isDeviceExist = this.deviceRepository
      .findByIp(ip + masad)
      .then((res) => res);
    const isAddressAvailable = this.pingerService
      .isHostAlive(ip + masad)
      .then((res) => res.isAlive);
    const isCompressorIpAvailable = this.pingerService
      .isHostAlive(compressorIp + masad)
      .then((res) => res.isAlive);

    return (
      await Promise.all([
        isDeviceExist,
        isAddressAvailable,
        isCompressorIpAvailable,
      ])
    ).every((res) => !res);
  };

  private findAvailableAddressForSpider = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{ ip: string; compressorIp: string; compressorIp2: string }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;

    if (dto.masad) {
      if (await this.isAddressAvailableForSpivivtz(ip, dto.masad)) {
        return {
          ip: ip + dto.masad,
          compressorIp: compressorIp + dto.masad,
          compressorIp2: compressorIp2 + dto.masad,
        };
      }
      return null;
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForSpivivtz(ip, i)) {
          res({
            ip: ip + i,
            compressorIp: compressorIp + i,
            compressorIp2: compressorIp2 + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private findAvailableAddressForNetz = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{ IUIP: string; compressorIp: string; compressorIp2: string }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;

    if (dto.masad) {
      if (await this.isAddressAvailableForSpivivtz(ip, dto.masad)) {
        return {
          IUIP: ip + dto.masad,
          compressorIp: compressorIp + dto.masad,
          compressorIp2: compressorIp2 + dto.masad,
        };
      }
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForSpivivtz(ip, i)) {
          res({
            IUIP: ip + i,
            compressorIp: compressorIp + i,
            compressorIp2: compressorIp2 + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private findAvailableAddressForAviv = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{
    MagicIP: string;
    compressorIp: string;
    compressorIp2: string;
  }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;

    if (dto.masad) {
      if (await this.isAddressAvailableForSpivivtz(ip, dto.masad)) {
        return {
          MagicIP: ip + dto.masad,
          compressorIp: compressorIp + dto.masad,
          compressorIp2: compressorIp2 + dto.masad,
        };
      }
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForSpivivtz(ip, i)) {
          res({
            MagicIP: ip + i,
            compressorIp: compressorIp + i,
            compressorIp2: compressorIp2 + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private isAddressAvailableForKarnatz = async (
    ip: string,
    masad: number,
  ): Promise<boolean> => {
    const computerIp2 = `${ip}${computerIP2}`;
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;

    const isDeviceExist = this.deviceRepository.findByIp(ip + masad);
    const isIpAlive = this.pingerService
      .isHostAlive(ip + masad)
      .then((res) => res.isAlive);
    const isComputerIp2Alive = this.pingerService
      .isHostAlive(computerIp2 + masad)
      .then((res) => res.isAlive);
    const isCompressorIpAlive = this.pingerService
      .isHostAlive(compressorIp + masad)
      .then((res) => res.isAlive);
    const isCompressorIp2Alive = this.pingerService
      .isHostAlive(compressorIp2 + masad)
      .then((res) => res.isAlive);

    return (
      await Promise.all([
        isDeviceExist,
        isIpAlive,
        isComputerIp2Alive,
        isCompressorIpAlive,
        isCompressorIp2Alive,
      ])
    ).every((res) => !res);
  };

  private findAvailableAddressForKarnatz = async (
    dto: AvailableAddressForDeviceDto,
  ) => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;
    const computerIp2 = `${ip}${computerIP2}`;
    const compressorIp = `${ip}${Compressor}`;
    const compressorIp2 = `${ip}${Compressor2}`;
    if (dto.masad) {
      if (await this.isAddressAvailableForKarnatz(ip, dto.masad)) {
        return {
          ip: ip + dto.masad,
          computerIp2: computerIp2 + dto.masad,
          compressorIp: compressorIp + dto.masad,
          compressorIp2: compressorIp2 + dto.masad,
        };
      }
      return null;
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForKarnatz(ip, i)) {
          res({
            ip: ip + i,
            computerIp2: computerIp2 + i,
            compressorIp: compressorIp + i,
            compressorIp2: compressorIp2 + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private isAddressAvailableForBarkan = async (
    ip: string,
    masad: number,
  ): Promise<boolean> => {
    const isDeviceExist = this.deviceRepository
      .findByIp(ip + masad)
      .then((res) => res);
    const isAddressAvailable = this.pingerService
      .isHostAlive(ip + masad)
      .then((res) => res.isAlive);

    return (await Promise.all([isDeviceExist, isAddressAvailable])).every(
      (res) => !res,
    );
  };

  private findAvailableAddressForBarkan = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{ ip: string }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;

    if (dto.masad) {
      if (await this.isAddressAvailableForBarkan(ip, dto.masad)) {
        return {
          ip: ip + dto.masad,
        };
      }
      return null;
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForBarkan(ip, i)) {
          res({
            ip: ip + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private isAddressAvailableForRadar = async (
    ip: string,
    masad: number,
  ): Promise<boolean> => {
    const isDeviceExists = this.deviceRepository
      .findByIp(ip + masad)
      .then((res) => res);
    const isAddressAvailable = this.pingerService
      .isHostAlive(ip + RadarIP + masad)
      .then((res) => res.isAlive);
    return (await Promise.all([isDeviceExists, isAddressAvailable])).every(
      (res) => !res,
    );
  };

  private findAvailableAddressForRadar = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{ ip: string }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;

    if (dto.masad) {
      if (await this.isAddressAvailableForRadar(ip, dto.masad)) {
        return {
          ip: ip + RadarIP + dto.masad,
        };
      }
      return null;
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForRadar(ip, i)) {
          res({
            ip: ip + RadarIP + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };

  private isAddressAvailableForSecCamera = async (
    ip: string,
    masad: number,
  ): Promise<boolean> => {
    const isDeviceExists = this.deviceRepository.findByIp(ip + masad);
    const isAddressAvailable = this.pingerService
      .isHostAlive(ip + Port + masad)
      .then((res) => res.isAlive);
    return (await Promise.all([isDeviceExists, isAddressAvailable])).every(
      (res) => !res,
    );
  };

  private findAvailableAddressForSecCamera = async (
    dto: AvailableAddressForDeviceDto,
  ): Promise<{ ip: string }> => {
    const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;

    if (dto.masad) {
      if (await this.isAddressAvailableForSecCamera(ip, dto.masad)) {
        return {
          ip: ip + Port + dto.masad,
        };
      }
      return null;
    }

    const promises = [];

    for (let i = 1; i <= amountOfDevices; i++) {
      const promise = new Promise(async (res) => {
        if (await this.isAddressAvailableForSecCamera(ip, i)) {
          res({
            ip: ip + Port + i,
          });
        } else {
          res(false);
        }
      });
      promises.push(promise);
    }

    const addresses = (await Promise.all(promises)).find((el) => el != false);

    if (addresses) {
      return addresses;
    }

    return null;
  };
}
