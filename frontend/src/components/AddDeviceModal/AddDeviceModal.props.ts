import { IFindAvailableAddressResponse } from '@/shared/api/device.api/device.api.interfaces';

export interface AddDeviceModalProps {
  onSubmit: () => void;
  onCancel: () => void;
  data: IFindAvailableAddressResponse | undefined;
}
