import { useMutation } from 'react-query';

import { findAvailableAddress, addDevice, deleteDevices } from '@/shared/api/device.api/device.api';

export const useFindAddressMutation = (onError: (error: unknown) => void) =>
  useMutation({
    mutationFn: findAvailableAddress,
    onError: (error) => onError(error),
  });

export const useAddDeviceMutation = (onSuccess: () => void, onError: (error: unknown) => void) =>
  useMutation({
    mutationFn: addDevice,
    onSuccess,
    onError: (error) => onError(error),
  });

export const useDeleteDevices = (onSuccess: () => void) =>
  useMutation({
    mutationFn: deleteDevices,
    onSuccess,
  });
