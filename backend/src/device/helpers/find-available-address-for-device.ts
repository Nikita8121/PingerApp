import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { DeviceModel } from '../device.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AvailableAddressForDeviceDto } from '../dto/device-available.dto';
import {
  Compressor,
  Compressor2,
  computerIP2,
  Port,
  RadarIP,
} from './device.constants';
import { Injectable } from '@nestjs/common';
import { DeviceRepository } from '../device.repository';

const amountOfDevices = 9;

@Injectable()
export class FindAvailAddressForDeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly pingerService: PingerHelperService,
  ) {}

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

    const isDeviceExist = this.deviceRepository.getById(ip + masad);
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
      .getById(ip + masad)
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
        if (
          await isAddressAvailableForBarkan(deviceModel, pingerService, ip, i)
        ) {
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
}

//#region Barkan

//#endregion

//#region Radar
const isAddressAvailableForRadar = async (
  deviceModel: ModelType<DeviceModel>,
  pingerService: PingerHelperService,
  ip: string,
  masad: number,
): Promise<boolean> => {
  const isDeviceExists = deviceModel
    .findOne({ ip: ip + masad })
    .then((res) => res);
  const isAddressAvailable = pingerService
    .isHostAlive(ip + RadarIP + masad)
    .then((res) => res.isAlive);
  return (await Promise.all([isDeviceExists, isAddressAvailable])).every(
    (res) => !res,
  );
};

export const findAvailableAddressForRadar = async (
  dto: AvailableAddressForDeviceDto,
  amountOfDevices: number,
  pingerService: PingerHelperService,
  deviceModel: ModelType<DeviceModel>,
): Promise<{ ip: string }> => {
  const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;

  if (dto.masad) {
    if (
      await isAddressAvailableForRadar(
        deviceModel,
        pingerService,
        ip,
        dto.masad,
      )
    ) {
      return {
        ip: ip + RadarIP + dto.masad,
      };
    }
    return null;
  }

  const promises = [];

  for (let i = 1; i <= amountOfDevices; i++) {
    const promise = new Promise(async (res) => {
      if (await isAddressAvailableForRadar(deviceModel, pingerService, ip, i)) {
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
//#endregion

//#region  SecCamera
const isAddressAvailableForSecCamera = async (
  deviceModel: ModelType<DeviceModel>,
  pingerService: PingerHelperService,
  ip: string,
  masad: number,
): Promise<boolean> => {
  const isDeviceExists = deviceModel.findOne({ ip: ip + masad });
  const isAddressAvailable = pingerService
    .isHostAlive(ip + Port + masad)
    .then((res) => res.isAlive);
  return (await Promise.all([isDeviceExists, isAddressAvailable])).every(
    (res) => !res,
  );
};

export const findAvailableAddressForSecCamera = async (
  dto: AvailableAddressForDeviceDto,
  amountOfDevices: number,
  pingerService: PingerHelperService,
  deviceModel: ModelType<DeviceModel>,
): Promise<{ ip: string }> => {
  const ip = `${dto.location}.${dto.hamal}.${dto.area}.`;

  if (dto.masad) {
    if (
      await isAddressAvailableForSecCamera(
        deviceModel,
        pingerService,
        ip,
        dto.masad,
      )
    ) {
      return {
        ip: ip + Port + dto.masad,
      };
    }
    return null;
  }

  const promises = [];

  for (let i = 1; i <= amountOfDevices; i++) {
    const promise = new Promise(async (res) => {
      if (
        await isAddressAvailableForSecCamera(deviceModel, pingerService, ip, i)
      ) {
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
//#endregion
