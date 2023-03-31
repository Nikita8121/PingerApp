import { Box, CircularProgress } from '@mui/material';
import { LoaderProps } from './Loader.props';

export const Loader = ({ size = 40 }: LoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxHeight: `${size}px`,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};
