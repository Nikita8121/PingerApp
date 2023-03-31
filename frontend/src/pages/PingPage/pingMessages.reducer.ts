import { IPingDevicesMessage } from '@/shared/types/index.interface';

export type PingMessagesActions = { type: 'add'; payload: IPingDevicesMessage } | { type: 'reset' };

export interface PingMessagesReducerState {
  pingMessages: IPingDevicesMessage[];
}

export const pingsReducer = (state: PingMessagesReducerState, action: PingMessagesActions) => {
  switch (action.type) {
    case 'add':
      return {
        pingMessages: [...state.pingMessages, action.payload],
      };
    case 'reset':
      return {
        pingMessages: [],
      };
  }
};
