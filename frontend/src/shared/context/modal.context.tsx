import { ModalMessages } from '@/components/ModalMessages/ModalMessages';
import { createContext, ReactNode, useState, useEffect } from 'react';
import { messageStatusesType } from '../types/index.types';

export interface IModalMessagesContext {
  openModal?: (status: messageStatusesType, message: string) => void;
  closeModal?: () => void;
}

export const ModalMessagesContext = createContext<IModalMessagesContext>({});

export const ModalMessagesContextProvider = ({
  children,
}: IModalMessagesContext & { children: ReactNode }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<messageStatusesType | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);

  const openModal = (status: messageStatusesType, message: string) => {
    setIsOpen(true);
    setStatus(status);
    setMessage(message);
    setTitle(title);
  };

  const closeModal = () => {
    setIsOpen(false);
    /*  setStatus(null);
    setMessage(null);
    setTitle(null); */
  };

  return (
    <ModalMessagesContext.Provider value={{ openModal, closeModal }}>
      <ModalMessages onClose={closeModal} isOpen={isOpen} status={status} message={message} />
      {children}
    </ModalMessagesContext.Provider>
  );
};
