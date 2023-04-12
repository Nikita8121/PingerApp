import { Box, CircularProgress } from '@mui/material';
import { LoaderProps } from './Loader.props';

export const Loader = ({ size = 40, fullPage }: LoaderProps) => {
  const styles = fullPage
    ? {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        backgroundColor: '#f5f6f8',
        top: 0,
        left: 0,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        maxHeight: `${size}px`,
      };

  return (
    <Box sx={styles}>
      <CircularProgress size={fullPage ? 100 : size} />
    </Box>
  );
};
