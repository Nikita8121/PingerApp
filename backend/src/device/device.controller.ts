import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Query,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { DeviceCreateDto } from './dto/device-create.dto';
import { DeviceService } from './device.service';

import { DeviceDeleteDto } from './dto/device.delete.dto';

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

  @Post('delete')
  async deleteDevice(@Body() deviceDeleteDto: DeviceDeleteDto) {
    return this.devicesService.deleteDevice(deviceDeleteDto);
  }

  @Post('deleteMany')
  async deleteDevices(@Body() devicesDeleteDto: DeviceDeleteDto[]) {
    return this.devicesService.deleteDevices(devicesDeleteDto);
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
    return this.devicesService.getDevices();
  }

  @Get('excel')
  async excel(){
    return this.devicesService.getDataForExcel();
  }
}
