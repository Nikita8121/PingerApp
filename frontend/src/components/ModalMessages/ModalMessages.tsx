import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import { ModalMessagesProps } from './ModalMessages.props';
import { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalMessages = ({ isOpen, status, message, onClose }: ModalMessagesProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpened(isOpen);
  }, [isOpen]);

  const getTitleText = () => {
    return status === 'success' ? 'הצלחה' : 'שגיאה';
  };

  const getIcon = () => {
    if (status === 'success') {
      return <CheckCircleOutlineIcon sx={{ fontSize: 40 }} color='success' />;
    }

    return <ErrorIcon sx={{ fontSize: 40 }} color='error' />;
  };

  return (
    <Modal
      open={isModalOpened}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fade in={isModalOpened}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {getTitleText()}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            {getIcon()}
            <Typography id='modal-modal-description' sx={{ paddingRight: '1rem' }}>
              {message}
            </Typography>
          </Box>
          <Button variant='contained' sx={{ marginTop: '2rem' }} onClick={onClose}>
            לסגור
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};
