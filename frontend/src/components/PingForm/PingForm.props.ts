import { IPingDevicesData } from '@/shared/types/index.interface';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PingFromProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  submitFunc: (data: IPingDevicesData) => void;
}
