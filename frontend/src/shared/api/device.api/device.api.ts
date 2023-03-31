import axiosClient from '../axios.instance';
import {
  IAddDeviceData,
  IDevice,
  IFindAvailableAddressData,
  IFindAvailableAddressResponse,
  IHamal,
} from './device.api.interfaces';

export const findAvailableAddress = async (
  data: IFindAvailableAddressData,
): Promise<IFindAvailableAddressResponse> => {
  return axiosClient
    .post<IFindAvailableAddressResponse>('device/find-available-address', data)
    .then((res) => res.data);
};

export const addDevice = async (data: IAddDeviceData) => {
  return axiosClient.post('device/add', data);
};

export const getAllDevices = async (): Promise<IDevice[]> => {
  return axiosClient.get('device').then((res) => res.data);
};

export const deleteDevices = async (data: string[]): Promise<any> => {
  return axiosClient.post('device/deleteMany', data);
};

export const getDevicesForExcel = async (): Promise<IHamal[]> => {
  return axiosClient.get('device/excel').then((res) => res.data);
};
