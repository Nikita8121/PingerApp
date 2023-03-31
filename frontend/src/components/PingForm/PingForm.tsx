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
import styles from './PingFrom.module.scss';
import { IPingForm } from './PingForm.interface';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { PingFromProps } from './PingForm.props';

export const PingForm = ({ submitFunc, ...props }: PingFromProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<IPingForm>();

  const watchNumberOfLastArea = watch('numberOfLastArea');

  useEffect(() => {
    if (!watchNumberOfLastArea) return;

    const numberOfFirstArea = getValues('numberOfFirstArea');

    if (watchNumberOfLastArea < numberOfFirstArea) {
      setValue('numberOfLastArea', numberOfFirstArea);
    }
  }, [watchNumberOfLastArea]);

  return (
    <div {...props}>
      <form onSubmit={handleSubmit(submitFunc)}>
        <Grid container columnSpacing={{ xs: 0, md: 3 }} rowSpacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('hamal', {
                required: { value: true, message: 'צריך למלא שדה של חמ"ל' },
                valueAsNumber: true,
              })}
              type='number'
              error={!!errors.hamal}
              fullWidth
              id='hamal'
              label='קוד חמ”ל'
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              id='firstArea'
              label='מספר אתר ראשון'
              variant='outlined'
              {...register('numberOfFirstArea', {
                required: { value: true, message: 'צריך לבחור אתר איסוף ראשון' },
                valueAsNumber: true,
              })}
              error={!!errors.numberOfFirstArea}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='place'>מקום</InputLabel>
              <Select
                {...register('location', {
                  required: { value: true, message: 'צריך לבחור מקום' },
                  valueAsNumber: true,
                })}
                error={!!errors.location}
                labelId='place'
                id='place'
                fullWidth
                label='מקום'
              >
                <MenuItem value={93}>חמ"ל</MenuItem>
                <MenuItem value={94}>אתר</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('numberOfLastArea', {
                required: false,
                valueAsNumber: true,
              })}
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              id='lastArea'
              label='מספר אתר אחרון(אופציונלי)'
              variant='outlined'
            />
          </Grid>
        </Grid>
        <Divider className={styles.divider} />
        <Box className={styles.actions}>
          <Button type='submit' variant='contained'>
            לשלוח פינגים
          </Button>
        </Box>
      </form>
    </div>
  );
};
