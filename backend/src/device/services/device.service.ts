import { BadRequestException, Injectable } from '@nestjs/common';
import { DeviceCreateDto } from '../dto/device-create.dto';
import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { AvailableAddressForDeviceDto } from '../dto/device-available.dto';

import { DeviceDeleteDto } from '../dto/device.delete.dto';
import { FindAvailAddressForDeviceHelperService } from './helpers/find-available-address-for-device.service';
import { AvailableAddressDto } from '../dto/device-available-address-results.dto';
import { Interval } from '@nestjs/schedule';
import { DeviceType } from '../types/enums/device-type.enum';
import { CheckAddressAvailabilityHelperService } from './helpers/check-address-availability-for-device-helper.service';
import { groupBy } from '../../helpers/groupByArray.helper';
import { DevicesGetDto } from '../dto/devices-get.dto';
import { hamals } from '../helpers/device.constants';
import { DeviceFactory } from '../factories/device.factory';
import { IHamal } from '../types/interfaces/hamal.interface';
import { enrichedDeviceType } from '../types/index.types';
import {
  IAviv,
  IBarkan,
  IKarnatz,
  INetz,
  IRadar,
  ISecCamera,
  ISecController,
  ISpider,
} from '../types/interfaces/devices';
import { KarnatzComponentsFactory } from '../factories/components/karnatz-components.factory';
import { BarkanComponentsFactory } from '../factories/components/barkan-components.factory';
import { NetzComponentsFactory } from '../factories/components/netz-components.factory';
import { AvivComponentsFactory } from '../factories/components/aviv-components.factory';
import { SpiderComponentsFactory } from '../factories/components/spider-components.factory';
import { RadarComponentsFactory } from '../factories/components/radar-components.factory';
import { SecCameraComponentsFactory } from '../factories/components/sec-camera-components.factory';
import { SecControllerFactory } from '../factories/components/sec-controller.factory';
import { DeviceRepository } from '../device.repository';
import { IDevice } from '../types/interfaces/device.interface';

const amountOfDevices: number = 9;

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly pingerHelperService: PingerHelperService,
    private readonly checkAddressAvailabilityHelperService: CheckAddressAvailabilityHelperService,
    private readonly findAvailAddressForDeviceHelperService: FindAvailAddressForDeviceHelperService,
  ) {}

  /**
   * adds a device to the database acording to a user's input
   * @param deviceCreateDto values of a new device
   * @returns the device cords and
   * @erorr throws for device cords that have been taken
   */

  async addDevice(deviceCreateDto: DeviceCreateDto): Promise<IDevice> {
    if (await this.deviceRepository.findByIp(deviceCreateDto.ip))
      throw new BadRequestException('cords taken');

    const deviceFactory = new DeviceFactory(deviceCreateDto);
    const deviceEntity = deviceFactory.getDeviceEntity();

    return this.deviceRepository.create(deviceEntity);
  }

  /**
   * removes a selected device from the database
   * @param deviceDeleteDto value of an id
   * @returns the id of the deleted device
   */
  async deleteDevice(deviceDeleteDto: DeviceDeleteDto) {
    const device = await this.deviceRepository.getById(deviceDeleteDto.id);
    if (device) {
      return this.deviceRepository.delete(deviceDeleteDto.id);
    }
    return undefined;
  }

  async deleteDevices(devicesDeleteDto: DeviceDeleteDto[]) {
    return this.deviceRepository.deleteMany(
      devicesDeleteDto.map((el) => el.id),
    );
  }

  /**
   * finds availiable cords for device according to the database and what stated in the field/hamal.
   * @param dto values of a location and a type of device.
   * @returns the cords of a device that could be created or undefined if there are none.
   */
  async findAvailableAddress(
    dto: AvailableAddressForDeviceDto,
  ): Promise<AvailableAddressDto> {
    const addresses =
      await this.findAvailAddressForDeviceHelperService.findAvailAddressForDevice(
        dto,
      );

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
    const devices = await this.deviceRepository.getAll();
    devices.map((device) => {
      const deviceObject = device.toObject();
      const isDeviceAvailable =
        this.checkAddressAvailabilityHelperService.checkAddressAvailability(
          deviceObject,
        );
      if (isDeviceAvailable) {
        device.$set({ isAlive: isDeviceAvailable });
        device.save();
      }
    });
  }

  async getDevicesWithHamal(): Promise<DevicesGetDto[]> {
    return (await this.deviceRepository.getAll()).map((device) => {
      return {
        ...(device.toObject() as IDevice),
        hamalName: hamals[device.hamal].name,
      };
    });
  }

  async getDataForExcel(): Promise<IHamal[]> {
    const devices = await this.getDevicesWithHamal();

    const enrichedDevices: enrichedDeviceType[] = devices.map((device) => {
      switch (device.deviceType) {
        case DeviceType.Karnatz:
          return {
            ...device,
            components: KarnatzComponentsFactory.getKarnatzComponents(
              device.device as IKarnatz,
            ),
          };
        case DeviceType.Barkan:
          return {
            ...device,
            components: BarkanComponentsFactory.getBarkanComponents(
              device.device as IBarkan,
            ),
          };
        case DeviceType.Netz:
          return {
            ...device,
            components: NetzComponentsFactory.getNetzComponents(
              device.device as INetz,
            ),
          };
        case DeviceType.Aviv:
          return {
            ...device,
            components: AvivComponentsFactory.getAvivComponents(
              device.device as IAviv,
            ),
          };
        case DeviceType.Spider:
          return {
            ...device,
            components: SpiderComponentsFactory.getSpiderComponents(
              device.device as ISpider,
            ),
          };
        case DeviceType.Radar:
          return {
            ...device,
            components: RadarComponentsFactory.getRadarComponents(
              device.device as IRadar,
            ),
          };
        case DeviceType.SecCamera:
          return {
            ...device,
            components: SecCameraComponentsFactory.getSecCameraComponents(
              device.device as ISecCamera,
            ),
          };
        case DeviceType.SecController:
          return {
            ...device,
            components: SecControllerFactory.getSecControllerComponents(
              device.device as ISecController,
            ),
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
