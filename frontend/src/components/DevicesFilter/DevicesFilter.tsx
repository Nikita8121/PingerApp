import { DeviceTypeEnum } from '@/shared/types/index.enums';
import {
  Box,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DevicesFilterProps } from './DevicesFilter.props';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { hamalsConstant } from '@/shared/constants/index.constants';

export const DevicesFilter = ({ setFilter }: DevicesFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '5px 5px 0 0',
        padding: '0.5rem 0.5rem 0.5rem 0.5rem',
        boxShadow: 'var(--mui-shadows-1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <IconButton
          aria-label='expand row'
          size='small'
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant='body1'>{isFilterOpen ? 'לסגור סינון' : 'לפתוח סינון'}</Typography>
      </Box>
      <Collapse in={isFilterOpen}>
        <Grid
          container
          sx={{ paddingTop: '0.5rem' }}
          columnSpacing={{ xs: 0, md: 3 }}
          rowSpacing={2}
        >
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='aliveStatus'>סטטוס</InputLabel>
              <Select
                onChange={({ target }) =>
                  setFilter(
                    'isAlive',
                    (target.value as string) === 'alive'
                      ? true
                      : (target.value as string) === 'disconnected'
                      ? false
                      : '',
                  )
                }
                labelId='aliveStatus'
                id='aliveStatus'
                fullWidth
                label='סטטוס'
              >
                <MenuItem value={''}>אף אחד</MenuItem>
                <MenuItem value={'disconnected'}>רזרבה</MenuItem>
                <MenuItem value={'alive'}>מבצעי</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='deviceType'>סוג אמצעי</InputLabel>
              <Select
                onChange={({ target }) => setFilter('deviceType', target.value as string)}
                labelId='deviceType'
                id='deviceType'
                fullWidth
                label='סוג אמצעי'
              >
                <MenuItem value={''}>אף אחד</MenuItem>
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
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='place'>מיקום</InputLabel>
              <Select
                onChange={({ target }) => setFilter('location', target.value as number)}
                labelId='place'
                id='place'
                fullWidth
                label=''
              >
                <MenuItem value={0}>אף אחד</MenuItem>
                <MenuItem value={93}>חמ"ל</MenuItem>
                <MenuItem value={94}>אתר</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              onChange={({ target }) => setFilter('hamal', +target.value)}
              select
              id='hamal'
              fullWidth
              label='שם חמ"ל'
            >
              <MenuItem value={0}>אף אחד</MenuItem>
              {Object.keys(hamalsConstant).map((code) => (
                <MenuItem key={code} value={parseInt(code)}>
                  {hamalsConstant[parseInt(code)].name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              id='firstArea'
              label='מספר אתר'
              onChange={({ target }) => setFilter('area', target.value)}
              variant='outlined'
              helperText='צריך להכניס מיקום ומספר חמ"ל'
            />
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};
