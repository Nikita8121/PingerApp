import { IDeviceFilterProperties } from '@/shared/types/index.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DevicesFilterProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setFilter: (key: keyof IDeviceFilterProperties, value: string | number | boolean) => void;
}
