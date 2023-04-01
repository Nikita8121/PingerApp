import { IDevice } from '@/shared/api/device.api/device.api.interfaces';
import { IDeviceFilterProperties } from '@/shared/types/index.interface';
import { useMemo, useState } from 'react';
export const useFilterDevices = (devices: IDevice[]) => {
  const [filters, setFilters] = useState<IDeviceFilterProperties>({});

  const filteredData = useMemo(() => {
    return devices?.filter((device) => {
      const isFilterPropertyEqualToDevice = Object.keys(filters).every((key) => {
        if (!filters[key as keyof IDeviceFilterProperties]) return true;

        return (
          filters[key as keyof IDeviceFilterProperties] ==
          device[key as keyof IDeviceFilterProperties]
        );
      });

      if (isFilterPropertyEqualToDevice) {
        return device;
      }
    });
  }, [filters, devices]);

  const setFilter = (
    key: keyof IDeviceFilterProperties,
    value: string | number | boolean,
  ): void => {
    setFilters({ ...filters, [key]: value });
  };

  return { filteredDevices: filteredData, setFilter };
};
