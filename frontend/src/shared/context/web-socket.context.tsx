import { createContext, ReactNode, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export interface IWebsocketContext {
  isReady: boolean;
  sendMessage: (name: string, message: any) => void;
  subscribeToEvent: (name: string, onEvent: (message: any) => void) => void;
  unsubscribeFromEvent: (name: string) => void;
}

const webSocketUrl = import.meta.env.VITE_APP_WEB_SOCKET_URL;
const socket = io(webSocketUrl, { transports: ['websocket', 'polling'] });
export const WebsocketContext = createContext<IWebsocketContext | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isReady, setIsReady] = useState<IWebsocketContext['isReady']>(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket');
      setIsReady(true);
    });
    return () => {
      console.log('Unregistered Events...');
      socket.off('connect');
      setIsReady(false);
    };
  }, []);

  const sendMessage: IWebsocketContext['sendMessage'] = (name, message) => {
    socket.emit(name, message);
  };

  const subscribeToEvent: IWebsocketContext['subscribeToEvent'] = (name, onEvent) => {
    socket.on(name, (message: unknown) => {
      onEvent(message);
    });
  };

  const unsubscribeFromEvent: IWebsocketContext['unsubscribeFromEvent'] = (name) => {
    socket.off(name);
  };

  return (
    <WebsocketContext.Provider
      value={{
        isReady,
        sendMessage,
        subscribeToEvent,
        unsubscribeFromEvent,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};
