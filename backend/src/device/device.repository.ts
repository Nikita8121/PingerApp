import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { DeviceModel } from './device.model';
import { IDevice } from './types/interfaces/device.interface';

@Injectable()
export class DeviceRepository {
  constructor(private readonly deviceModel: ModelType<DeviceModel>) {}

  create(device: IDevice) {
    return this.deviceModel.create(device);
  }

  async delete(id: string) {
    return this.deviceModel.findByIdAndDelete(id);
  }

  async deleteMany(idArr: string[]) {
    return this.deviceModel.deleteMany({
      _id: {
        $in: idArr,
      },
    });
  }

  async getById(id: string) {
    return this.deviceModel.findById(id);
  }

  async getAll() {
    return this.deviceModel.find({});
  }

  async findByIp(ip: string) {
    return this.deviceModel.findOne({ ip });
  }
}
