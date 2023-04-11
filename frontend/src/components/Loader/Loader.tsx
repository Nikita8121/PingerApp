import { Box, CircularProgress } from '@mui/material';
import { LoaderProps } from './Loader.props';

export const Loader = ({ size = 40, fullPage }: LoaderProps) => {
  const styles = fullPage
    ? {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        maxHeight: `${size}px`,
      };

  return (
    <Box sx={styles}>
      <CircularProgress size={size} />
    </Box>
  );
};
