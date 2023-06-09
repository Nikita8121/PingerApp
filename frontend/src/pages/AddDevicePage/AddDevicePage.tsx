import {
  FindAvailAddressForm,
  AddDeviceModal,
  Loader,
  FindAvailAddressFormRef,
} from '@/components';
import { withLayout } from '@/layout/Layout';
import { ModalMessagesContext } from '@/shared/context/modal.context';
import { useFindAddressMutation, useAddDeviceMutation } from '@/shared/mutations/device.mutation';
import axios from 'axios';
import { createRef, useContext } from 'react';

export const AddDevicePage = () => {
  const { openModal } = useContext(ModalMessagesContext);
  const findAvailAddressFormRef = createRef<FindAvailAddressFormRef>();

  const onDeviceAdded = () => {
    openModal && openModal('success', 'הוספת אמצעי');
    findAvailAddressFormRef.current?.resetForm();
  };

  const onFindAddressFailed = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        openModal && openModal('error', 'כתובת ip תפוס, תנסה עם אתר אחר');
      }
    }
  };

  const onDeviceAddFailed = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        openModal && openModal('error', 'כתובת ip תפוס, תנסה עם אתר אחר');
      }
    }
  };

  const {
    mutate: findAddress,
    isSuccess: isFindAddressSuccess,
    reset: resetFindAddress,
    isLoading: isLoadingAddresses,
    data,
  } = useFindAddressMutation(onFindAddressFailed);
  const { mutate: addDevice, isLoading: isAddingDevice } = useAddDeviceMutation(
    onDeviceAdded,
    onDeviceAddFailed,
  );

  const onSubmit = () => {
    if (data) {
      const { addresses, location, hamal, area, deviceType, port, masad } = data;
      const dataToSend = {
        ip: addresses[Object.keys(addresses)[0]],
        location,
        hamal,
        area,
        deviceType,
        port,
        masad,
      };
      addDevice(dataToSend);
      findAvailAddressFormRef.current?.resetForm();
    }
  };

  return (
    <>
      {(isLoadingAddresses || isAddingDevice) && <Loader fullPage />}
      {isFindAddressSuccess && (
        <AddDeviceModal onCancel={resetFindAddress} onSubmit={onSubmit} data={data} />
      )}
      <FindAvailAddressForm ref={findAvailAddressFormRef} submitFunc={findAddress} />
    </>
  );
};

export default withLayout(AddDevicePage);
