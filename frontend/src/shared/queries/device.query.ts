import { useQuery } from 'react-query';
import { getAllDevices, getDevicesForExcel } from '../api/device.api/device.api';
import { IHamal } from '../api/device.api/device.api.interfaces';

export const useDevicesQuery = () => {
  return useQuery({
    queryKey: ['devices'],
    queryFn: () => getAllDevices(),
  });
};

export const useDeviceExcelQuery = (onSuccess: (data: IHamal[]) => void) => {
  return useQuery({
    queryKey: ['devices-excel'],
    queryFn: () => getDevicesForExcel(),
    onSuccess: onSuccess,
    enabled: false,
  });
};
