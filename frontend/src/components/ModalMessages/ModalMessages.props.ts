import { messageStatusesType } from '@/shared/types/index.types';

export interface ModalMessagesProps {
  onClose: () => void;
  isOpen: boolean;
  status: messageStatusesType | null;
  message: string | null;
}
