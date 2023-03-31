import theme from '@/shared/mui-theme/theme';
import { PingPage, AddDevicePage, DevicesPage } from '@/pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import './App.scss';
import { WebSocketProvider } from '@/shared/context/web-socket.context';
import { ModalMessagesContextProvider } from '@/shared/context/modal.context';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <PingPage />,
  },
  {
    path: 'add-device',
    element: <AddDevicePage />,
  },
  {
    path: 'devices-statuses',
    element: <DevicesPage />,
  },
]);

export const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <WebSocketProvider>
              <ModalMessagesContextProvider>
                <RouterProvider router={router} />
              </ModalMessagesContextProvider>
            </WebSocketProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CssVarsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
