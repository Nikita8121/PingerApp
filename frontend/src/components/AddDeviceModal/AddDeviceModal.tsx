import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { AddDeviceModalProps } from './AddDeviceModal.props';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';

const transitionDuration = 500;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide timeout={transitionDuration} direction='up' ref={ref} {...props} />;
});

export const AddDeviceModal = ({ onSubmit, onCancel, data }: AddDeviceModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = (cb: () => void) => {
    setIsOpen(false);
    setTimeout(cb, transitionDuration);
  };

  const handleClose = () => {
    closeModal(onCancel);
  };

  const handleSubmit = () => {
    closeModal(onSubmit);
  };

  if (!data) return <></>;

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'כתובות פנויות'}</DialogTitle>
        <DialogContent>
          <List>
            {Object.keys(data.addresses).map((item) => (
              <ListItem key={item}>
                <ListItemText
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row-reverse',
                    gap: '5px',
                  }}
                  primary={':' + item}
                  secondary={data.addresses[item]}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'flex-start', gap: '20px' }}>
          <Button variant='contained' onClick={handleSubmit}>
            להוסיף אמצעי{' '}
          </Button>
          <Button variant='contained' onClick={handleClose}>
            לבטל
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
