import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { DeviceModel } from '../device.model';
import {
  AvivModel,
  KarnatzModel,
  NetzModel,
  RadarModel,
  BarkanModel,
  SecCameraModel,
  SpiderModel,
} from '../models';

export const isAvivAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as AvivModel;

  const results = await Promise.all([
    isHostAlive(device.CompressorIp),
    isHostAlive(device.CompressorIp2),
    isHostAlive(device.MagicIp),
  ]);
  return {
    compressorIP: results[0].isAlive,
    compressorIP2: results[1].isAlive,
    magicIP: results[2].isAlive,
  };
};

export const isBarkanAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as BarkanModel;

  const result = await Promise.all([isHostAlive(device.ComputerIp)]);

  return {
    ComputerIP: result[0].isAlive,
  };
};

export const isKarnatzAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  const results = await Promise.all([
    isHostAlive((device as KarnatzModel).CompressorIp),
    isHostAlive((device as KarnatzModel).CompressorIp2),
    isHostAlive((device as KarnatzModel).ComputerIp),
    isHostAlive((device as KarnatzModel).ComputerIp2),
  ]);

  return {
    compressorIP: results[0].isAlive,
    compressorIP2: results[1].isAlive,
    computerIP: results[2].isAlive,
    computerIP2: results[3].isAlive,
  };
};

export const isNetzAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as NetzModel;

  const results = await Promise.all([
    isHostAlive(device.IUIp),
    isHostAlive(device.CompressorIp),
    isHostAlive(device.CompressorIp2),
  ]);
  return {
    IUIP: results[0].isAlive,
    compressorIp: results[1].isAlive,
    compresorIp2: results[2].isAlive,
  };
};

export const isRadarAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as RadarModel;

  const results = await Promise.all([isHostAlive(device.RadarIP)]);
  return {
    radarIp: results[0].isAlive,
  };
};

export const isSecCameraAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as SecCameraModel;

  const results = await Promise.all([isHostAlive(device.CameraIp)]);

  return {
    CameraIP: results[0].isAlive,
  };
};

export const isSecControllerAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  //skip for now
};

export const isSpiderAlive = async (
  { isHostAlive }: PingerHelperService,
  { device }: DeviceModel,
) => {
  device = device as SpiderModel;

  const results = await Promise.all([
    isHostAlive(device.ComputerIp),
    isHostAlive(device.CompressorIp),
    isHostAlive(device.ComputerIp),
  ]);

  return {
    ComputerIP: results[0].isAlive,
    CompressorIP: results[1].isAlive,
    CompressorIP2: results[2].isAlive,
  };
};
