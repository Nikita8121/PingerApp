import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { DeviceCreateDto } from './dto/device-create.dto';
import { DeviceService } from './services/device.service';

import { AvailableAddressForDeviceDto } from './dto/device-available.dto';
import { ApiBadRequestResponse } from '@nestjs/swagger';

@Controller('device')
export class DeviceController {
  constructor(private readonly devicesService: DeviceService) {}

  @ApiBadRequestResponse({ description: 'ip was occupied' })
  @Post('add')
  async addDevice(@Body() deviceCreateDto: DeviceCreateDto) {
    return this.devicesService.addDevice(deviceCreateDto);
  }

  @Post('deleteMany')
  async deleteDevices(@Body() devicesIDs: string[]) {
    return this.devicesService.deleteDevices(devicesIDs);
  }

  @ApiBadRequestResponse({ description: `all ip's taken on area` })
  @Post('find-available-address')
  @HttpCode(200)
  async findAvailableAddress(@Body() dto: AvailableAddressForDeviceDto) {
    const data = await this.devicesService.findAvailableAddress(dto);
    if (data) return data;

    throw new BadRequestException(`all ip's taken on area`);
  }

  @Get()
  async getDevices() {
    return this.devicesService.getDevicesWithHamal();
  }

  @Get('excel')
  async excel() {
    return this.devicesService.getDataForExcel();
  }
}
