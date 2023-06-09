/* eslint-disable react/display-name */
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import styles from './FindAvailAddressForm.module.scss';
import { useForm } from 'react-hook-form';

import { IFindAvailableAddressData } from '@/shared/api/device.api/device.api.interfaces';
import { FindAvailAddressFormProps } from './FindAvailAddressForm.props';
import { DeviceTypeEnum, LocationEnum } from '@/shared/types/index.enums';
import { hamalsConstant } from '../../shared/constants/index.constants';
import { forwardRef, useImperativeHandle, useEffect } from 'react';

export interface FindAvailAddressFormRef {
  resetForm: () => void;
}

export const FindAvailAddressForm = forwardRef<FindAvailAddressFormRef, FindAvailAddressFormProps>(
  ({ submitFunc }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
    } = useForm<IFindAvailableAddressData>({
      defaultValues: {
        area: undefined,
        deviceType: DeviceTypeEnum.Aviv,
        hamal: parseInt(Object.keys(hamalsConstant)[0]),
        location: LocationEnum.hamal,
        masad: undefined,
      },
    });

    const location = watch('location');
    const hamal = watch('hamal');
    const device = watch('deviceType');

    useImperativeHandle(ref, () => ({
      resetForm() {
        reset();
      },
    }));

    return (
      <form onSubmit={handleSubmit(submitFunc)}>
        <Grid container columnSpacing={{ xs: 0, md: 3 }} rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('location', {
                required: { value: true, message: 'צריך לבחור מקום' },
                valueAsNumber: true,
              })}
              error={!!errors.location}
              select
              id='place'
              value={location}
              fullWidth
              label='מקום'
            >
              <MenuItem value={93}>חמ"ל</MenuItem>
              <MenuItem value={94}>אתר</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('hamal', {
                required: { value: true, message: 'צריך לבחור מקום' },
                valueAsNumber: true,
              })}
              value={hamal}
              error={!!errors.location}
              select
              id='hamal'
              fullWidth
              label='שם חמ"ל'
            >
              {Object.keys(hamalsConstant).map((code) => (
                <MenuItem key={code} value={parseInt(code)}>
                  {hamalsConstant[parseInt(code)].name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('area', {
                required: { value: true, message: 'צריך למלא שדה של מספר אתר' },
                valueAsNumber: true,
              })}
              error={!!errors.area}
              fullWidth
              id='מספר אתר'
              label='מספר אתר'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('deviceType', {
                required: { value: true, message: 'צריך למלא שדה של אמצעי' },
              })}
              select
              value={device}
              error={!!errors.deviceType}
              id='device'
              fullWidth
              label='אמצעי'
            >
              <MenuItem value={DeviceTypeEnum.Aviv}>{DeviceTypeEnum.Aviv}</MenuItem>
              <MenuItem value={DeviceTypeEnum.Barkan}>{DeviceTypeEnum.Barkan}</MenuItem>
              <MenuItem value={DeviceTypeEnum.Karnatz}>{DeviceTypeEnum.Karnatz}</MenuItem>
              <MenuItem value={DeviceTypeEnum.Netz}>{DeviceTypeEnum.Netz}</MenuItem>
              <MenuItem value={DeviceTypeEnum.Radar}>{DeviceTypeEnum.Radar}</MenuItem>
              <MenuItem value={DeviceTypeEnum.SecCamera}>{DeviceTypeEnum.SecCamera}</MenuItem>
              {/* <MenuItem value={DeviceTypeEnum.SecController}>
                {DeviceTypeEnum.SecController}
              </MenuItem> */}
              <MenuItem value={DeviceTypeEnum.Spider}>{DeviceTypeEnum.Spider}</MenuItem>
            </TextField>
          </Grid>
          {/* <Grid item xs={12} md={6}>
          <TextField
            {...register('port', {
              required: { value: true, message: 'צריך למלא שדה של Port' },
              valueAsNumber: true,
            })}
            error={!!errors.port}
            fullWidth
            id='Port'
            label='Port'
            variant='outlined'
          />
        </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              {...register('masad', {
                required: false,
                valueAsNumber: true,
              })}
              fullWidth
              id='מס"ד'
              label='מס"ד'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Divider className={styles.divider} />
        <Box className={styles.actions}>
          <Button type='submit' variant='contained'>
            למצוא כתובת לאמצעי
          </Button>
        </Box>
      </form>
    );
  },
);
