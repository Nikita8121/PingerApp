import { withLayout } from '../../layout/Layout';
import { PingForm } from '../../components';

import { PingsTable } from '@/components/PingsTable/PingsTable';

import { useEffect, useReducer, useContext, useState, useMemo } from 'react';
import { Loader } from '@/components/Loader/Loader';
import { IPingDevicesData, IPingDevicesMessage } from '@/shared/types/index.interface';
import { pingsReducer } from './pingMessages.reducer';
import { IWebsocketContext, WebsocketContext } from '../../shared/context/web-socket.context';
import { createExcelFromPingerResult } from './create-pinger-results';

const numberOfAddressesOnArea = 254;
let currentFormData: IPingDevicesData | null = null;

const PingPage = () => {
  const { isReady, sendMessage, subscribeToEvent, unsubscribeFromEvent } = useContext(
    WebsocketContext,
  ) as IWebsocketContext;

  const [{ pingMessages }, dispatchPingMessages] = useReducer(pingsReducer, {
    pingMessages: [],
  });

  const [isPingPending, setIsPingPending] = useState<boolean>(false);

  useEffect(() => {
    if (currentFormData && isPingingDone(currentFormData)) {
      handlePingingDone();
    }
  }, [pingMessages]);

  const isPingingDone = ({ numberOfFirstArea, numberOfLastArea }: IPingDevicesData) => {
    const end =
      (typeof numberOfLastArea == 'number' &&
        numberOfLastArea != numberOfFirstArea &&
        numberOfLastArea + 1) ||
      numberOfFirstArea + 1;
    const start = numberOfFirstArea;
    const numberOfAddresses = (end - start) * numberOfAddressesOnArea;
    return pingMessages.length === numberOfAddresses;
  };

  const handlePingingDone = () => {
    setIsPingPending(false);
    unsubscribeFromEvent('ping');
  };

  const handleSubmit = (data: IPingDevicesData) => {
    currentFormData = data;

    sendMessage('newPing', data);
    setIsPingPending(true);
    subscribeToEvent('ping', (message: IPingDevicesMessage) => {
      dispatchPingMessages({ type: 'add', payload: message });
    });
  };

  const isShowPingForm = useMemo(
    () => !pingMessages.length && !isPingPending && isReady,
    [pingMessages, isPingPending, isReady],
  );

  const isShowTable = useMemo(() => pingMessages.length > 0, [pingMessages]);

  const isShowLoader = useMemo(() => isPingPending || !isReady, [isPingPending, isReady]);

  return (
    <>
      {isShowPingForm ? <PingForm submitFunc={handleSubmit} /> : null}
      {isShowTable ? (
        <PingsTable
          createExcel={() => createExcelFromPingerResult(pingMessages)}
          makeNewPings={() => dispatchPingMessages({ type: 'reset' })}
          isPingsPending={isPingPending}
          data={pingMessages}
        />
      ) : null}
      {isShowLoader ? <Loader size={50} /> : null}
    </>
  );
};

export default withLayout(PingPage);
