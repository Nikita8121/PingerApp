import { IFindAvailableAddressData } from '@/shared/api/device.api/device.api.interfaces';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FindAvailAddressFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  submitFunc: (data: IFindAvailableAddressData) => void;
}
