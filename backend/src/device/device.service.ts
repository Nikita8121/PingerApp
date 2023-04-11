import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { DeviceModel } from './device.model';
import { DeviceCreateDto } from './dto/device-create.dto';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { IAtar, IHamal, enrichedDeviceType } from './device.types';
import { AvailableAddressForDeviceDto } from './dto/device-available.dto';

import { DeviceDeleteDto } from './dto/device.delete.dto';
import {
  findAvailableAddressForAviv,
  findAvailableAddressForBarkan,
  findAvailableAddressForKarnatz,
  findAvailableAddressForNetz,
  findAvailableAddressForRadar,
  findAvailableAddressForSecCamera,
  findAvailableAddressForSpider,
} from './helpers/find-available-address-for-device';
import { AvailableAddressDto } from './dto/device-available-address-results.dto';
import { Interval } from '@nestjs/schedule';
import { DeviceType } from './types/enums/device-type.enum';
import {
  isAvivAlive,
  isBarkanAlive,
  isKarnatzAlive,
  isNetzAlive,
  isRadarAlive,
  isSecCameraAlive,
  isSpiderAlive,
} from './helpers/check-address-availability-for-device';
import { createDevice } from './helpers/create-new-device';
import { groupBy } from '../helpers/groupByArray.helper';
import {
  AvivModel,
  BarkanModel,
  KarnatzModel,
  NetzModel,
  RadarModel,
  SecCameraModel,
  SecControllerModel,
  SpiderModel,
} from './models';
import { DevicesGetDto } from './dto/devices-get.dto';
import { hamals } from './helpers/device.constants';

const amountOfDevices: number = 9;

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(DeviceModel)
    private readonly deviceModel: ModelType<DeviceModel>,
    private readonly pingerHelperService: PingerHelperService,
  ) {}

  /**
   * adds a device to the database acording to a user's input
   * @param deviceCreateDto values of a new device
   * @returns the device cords and
   * @erorr throws for device cords that have been taken
   */

  async addDevice(deviceCreateDto: DeviceCreateDto): Promise<DeviceModel> {
    if (await this.deviceModel.findOne({ ip: deviceCreateDto.ip }))
      throw new BadRequestException('cords taken');
    return this.deviceModel.create({
      location: deviceCreateDto.location,
      hamal: deviceCreateDto.hamal,
      area: deviceCreateDto.area,
      ip: deviceCreateDto.ip,
      deviceType: deviceCreateDto.deviceType,
      hamalNum: deviceCreateDto.hamal,
      device: await createDevice(deviceCreateDto),
      isAlive: false,
    } as Omit<DeviceModel, '_id' | 'id'>);
  }

  /**
   * removes a selected device from the database
   * @param deviceDeleteDto value of an id
   * @returns the id of the deleted device
   */
  async deleteDevice(deviceDeleteDto: DeviceDeleteDto) {
    const device = await this.deviceModel.findById(deviceDeleteDto.id);
    if (device) {
      await this.deviceModel.findByIdAndDelete(deviceDeleteDto.id);
      return { id: deviceDeleteDto };
    }
    return undefined;
  }

  async deleteDevices(devicesDeleteDto: DeviceDeleteDto[]) {
    return this.deviceModel.deleteMany({
      _id: {
        $in: devicesDeleteDto,
      },
    });
  }

  /**
   * finds availiable cords for device according to the database and what stated in the field/hamal.
   * @param dto values of a location and a type of device.
   * @returns the cords of a device that could be created or undefined if there are none.
   */
  async findAvailableAddress(
    dto: AvailableAddressForDeviceDto,
  ): Promise<AvailableAddressDto> {
    let addresses: { [key: string]: string };

    switch (dto.deviceType) {
      case DeviceType.Aviv:
        addresses = await findAvailableAddressForAviv(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.Barkan:
        addresses = await findAvailableAddressForBarkan(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.Karnatz:
        addresses = await findAvailableAddressForKarnatz(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.Netz:
        addresses = await findAvailableAddressForNetz(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.Radar:
        addresses = await findAvailableAddressForRadar(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.SecCamera:
        addresses = await findAvailableAddressForSecCamera(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
      case DeviceType.SecController:
        break;
      case DeviceType.Spider:
        addresses = await findAvailableAddressForSpider(
          dto,
          amountOfDevices,
          this.pingerHelperService,
          this.deviceModel,
        );
        break;
    }
    if (addresses) {
      return {
        addresses,
        ...dto,
      };
    } else {
      return null;
    }
  }

  /**
   * pings devices to check their satatus and updates each IsAlive parameter in device according to the ping
   */
  @Interval(1000 * 60 * 60 * 24)
  async checkDevices(): Promise<void> {
    const devices = await this.deviceModel.find({});
    devices.map((device) => {
      const deviceObject = device.toObject();
      switch (deviceObject.deviceType) {
        case DeviceType.Aviv:
          isAvivAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.Barkan:
          isBarkanAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.Karnatz:
          isKarnatzAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.Netz:
          isNetzAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.Radar:
          isRadarAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.SecCamera:
          isSecCameraAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
        case DeviceType.SecController:
          return;
        case DeviceType.Spider:
          isSpiderAlive(this.pingerHelperService, device).then((res) => {
            const isAlive = Object.values(res).some((prop) => prop === true);
            device.$set({ isAlive: isAlive });
            device.save();
          });
          return;
      }
    });
  }

  async getDevices(): Promise<DevicesGetDto[]> {
    return (await this.deviceModel.find({})).map((device) => {
      return {
        ...(device.toObject() as DeviceModel),
        hamalName: hamals[device.hamal].name,
      };
    });
  }

  async getDataForExcel(): Promise<IHamal[]> {
    const devices = await this.getDevices();

    const enrichedDevices: enrichedDeviceType[] = devices.map((device) => {
      switch (device.deviceType) {
        case DeviceType.Karnatz:
          return {
            ...device,
            components: {
              Computer: {
                name: 'מחשב1',
                values: {
                  ip: (device.device as KarnatzModel).ComputerIp,
                  port: (device.device as KarnatzModel).Port,
                  MC: null,
                  portMC: null,
                },
              },
              Computer2: {
                name: 'מחשב2',
                values: {
                  ip: (device.device as KarnatzModel).ComputerIp2,
                  port: null,
                  MC: null,
                  portMC: null,
                },
              },
              Compressor1: {
                name: 'דוחס1',
                values: {
                  ip: (device.device as KarnatzModel).CompressorIp,
                  port: null,
                  MC: (device.device as KarnatzModel).CompressorMc,
                  portMC: (device.device as KarnatzModel).McPort,
                },
              },
              Compressor2: {
                name: 'דוחס2',
                values: {
                  ip: (device.device as KarnatzModel).CompressorIp2,
                  port: null,
                  MC: (device.device as KarnatzModel).CompressorMc2,
                  portMC: null,
                },
              },
            },
          };
        case DeviceType.Barkan:
          return {
            ...device,
            components: {
              Computer: {
                name: 'מחשב1',
                values: {
                  ip: (device.device as BarkanModel).ComputerIp,
                  port: (device.device as BarkanModel).Port,
                  MC: null,
                  portMC: null,
                },
              },
            },
          };
        case DeviceType.Netz:
          return {
            ...device,
            components: {
              IUIp: {
                name: 'IUIp',
                values: {
                  ip: (device.device as NetzModel).IUIp,
                  port: (device.device as NetzModel).Port,
                  MC: null,
                  portMC: null,
                },
              },
              KVM: {
                name: 'KVM',
                values: {
                  ip: (device.device as NetzModel).KVM,
                  port: null,
                  MC: null,
                  portMC: null,
                },
              },
              Compressor1: {
                name: 'דוחס1',
                values: {
                  ip: (device.device as NetzModel).CompressorIp,
                  port: null,
                  MC: (device.device as NetzModel).CompressorMc,
                  portMC: (device.device as NetzModel).McPort,
                },
              },
              Compressor2: {
                name: 'דוחס2',
                values: {
                  ip: (device.device as NetzModel).CompressorIp2,
                  port: null,
                  MC: (device.device as NetzModel).CompressorMc2,
                  portMC: null,
                },
              },
            },
          };
        case DeviceType.Aviv:
          return {
            ...device,
            components: {
              MagicIp: {
                name: 'MagicIp',
                values: {
                  ip: (device.device as AvivModel).MagicIp,
                  port: (device.device as AvivModel).Port,
                  MC: null,
                  portMC: null,
                },
              },
              Compressor1: {
                name: 'דוחס1',
                values: {
                  ip: (device.device as AvivModel).CompressorIp,
                  port: null,
                  MC: (device.device as AvivModel).CompressorMc,
                  portMC: (device.device as AvivModel).McPort,
                },
              },
              Compressor2: {
                name: 'דוחס2',
                values: {
                  ip: (device.device as AvivModel).CompressorIp2,
                  port: null,
                  MC: (device.device as AvivModel).CompressorMc2,
                  portMC: null,
                },
              },
            },
          };
        case DeviceType.Spider:
          return {
            ...device,
            components: {
              Computer: {
                name: 'מחשב1',
                values: {
                  ip: (device.device as SpiderModel).ComputerIp,
                  port: (device.device as SpiderModel).Port,
                  MC: null,
                  portMC: null,
                },
              },
              Compressor1: {
                name: 'דוחס1',
                values: {
                  ip: (device.device as AvivModel).CompressorIp,
                  port: null,
                  MC: (device.device as AvivModel).CompressorMc,
                  portMC: (device.device as AvivModel).McPort,
                },
              },
              Compressor2: {
                name: 'דוחס2',
                values: {
                  ip: (device.device as AvivModel).CompressorIp2,
                  port: null,
                  MC: (device.device as AvivModel).CompressorMc2,
                  portMC: null,
                },
              },
            },
          };
        case DeviceType.Radar:
          return {
            ...device,
            components: {
              Computer: {
                name: 'מחשב1',
                values: {
                  ip: (device.device as RadarModel).RadarIP,
                  port: null,
                  MC: null,
                  portMC: (device.device as RadarModel).MarsPort,
                },
              },
            },
          };
        case DeviceType.SecCamera:
          return {
            ...device,
            components: {
              Camera: {
                name: 'מצלמה',
                values: {
                  ip: (device.device as SecCameraModel).CameraIp,
                  port: null,
                  MC: (device.device as SecCameraModel).CameraMc,
                  portMC: (device.device as SecCameraModel).McPort,
                },
              },
            },
          };
        case DeviceType.SecController:
          return {
            ...device,
            components: {
              controller: {
                name: '',
                values: {
                  ip: (device.device as SecControllerModel).ip,
                  port: null,
                  MC: null,
                  portMC: null,
                },
              },
            },
          };
      }
    });

    const transformDataForPlace = (hamalDevices: enrichedDeviceType[]) => {
      const devicesByHamal = groupBy<enrichedDeviceType>(hamalDevices, 'hamal');
      return Object.keys(devicesByHamal).map((hamal) => {
        const devicesByArea = groupBy<enrichedDeviceType>(
          devicesByHamal[hamal],
          'area',
        );

        const areas = Object.keys(devicesByArea).map((area) => {
          return {
            area: parseInt(area),
            devices: devicesByArea[area],
          };
        });

        return {
          hamal: parseInt(hamal),
          areas,
        };
      });
    };
    return transformDataForPlace(enrichedDevices);
  }
}
