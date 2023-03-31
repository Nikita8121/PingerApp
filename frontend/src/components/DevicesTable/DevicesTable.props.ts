import { IDevice } from '@/shared/api/device.api/device.api.interfaces';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DeviceTableProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  devices: IDevice[] | undefined;
  onCreateExcel: () => void;
  onDelete: (data: string[]) => void;
  isDevicesLoading: boolean;
  isExcelDevicesLoading: boolean;
}
