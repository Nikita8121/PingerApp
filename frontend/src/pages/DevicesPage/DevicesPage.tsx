import { DevicesTable, DevicesFilter } from '@/components';
import { withLayout } from '@/layout/Layout';
import { useDeleteDevices } from '@/shared/mutations/device.mutation';
import { useDeviceExcelQuery, useDevicesQuery } from '@/shared/queries/device.query';
import { useState } from 'react';
import { createDevicesExcel } from './create-device-excel';
import { IHamal } from '../../shared/api/device.api/device.api.interfaces';
import { useFilterDevices } from './filter-devices.hook';

export const Devices = () => {
  const { data: devices, isLoading: isDevicesLoading, refetch: fetchDevices } = useDevicesQuery();
  const [isLoadingExcel, setIsLoadingExcel] = useState<boolean>(false);
  const onCreateExcelSuccess = (excel: IHamal[]) => {
    createDevicesExcel(excel);
    setIsLoadingExcel(false);
  };

  const { filteredDevices, setFilter } = useFilterDevices(devices ?? []);

  const { refetch: fetchDevicesExcel } = useDeviceExcelQuery(onCreateExcelSuccess);

  const onDeleteSuccess = () => {
    fetchDevices();
  };

  const { mutate } = useDeleteDevices(onDeleteSuccess);

  const onCreateExcel = () => {
    setIsLoadingExcel(true);
    fetchDevicesExcel();
  };

  return (
    <>
      <DevicesFilter setFilter={setFilter} />
      <DevicesTable
        onCreateExcel={() => onCreateExcel()}
        onDelete={mutate}
        devices={filteredDevices}
        isDevicesLoading={isDevicesLoading}
        isExcelDevicesLoading={isLoadingExcel}
      />
    </>
  );
};

export default withLayout(Devices);
