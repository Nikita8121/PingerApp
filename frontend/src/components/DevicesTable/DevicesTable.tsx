import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { IDevice } from '@/shared/api/device.api/device.api.interfaces';
import { DeviceTableProps } from './DevicesTable.props';
import { Loader } from '../Loader/Loader';
import { Button, CircularProgress, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { LocationEnum } from '@/shared/types/index.enums';
import { hamalsConstant } from '../../shared/constants/index.constants';

interface HeadCell {
  id: keyof IDevice | null;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'location',
    numeric: false,
    label: 'מיקום',
  },
  {
    id: 'hamal',
    numeric: true,
    label: 'חמ"ל',
  },
  {
    id: 'area',
    numeric: true,
    label: 'אתר',
  },
  {
    id: 'ip',
    numeric: true,
    label: 'IP',
  },
  {
    id: 'deviceType',
    numeric: true,
    label: 'סוג אמצעי',
  },
  {
    id: 'isAlive',
    numeric: true,
    label: 'סטטוס',
  },
  {
    id: null,
    numeric: true,
    label: '',
  },
];

interface DevicesTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const DevicesTableHead = (props: DevicesTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell align='right' key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface DevicesTableToolbarProps {
  numSelected: number;
  onDelete: () => void;
}

const DevicesTableToolbar = ({ numSelected, onDelete }: DevicesTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
          אמצעים
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const Row = ({
  device,
  onClick,
  isItemSelected,
  labelId,
}: {
  device: IDevice;
  onClick: (id: string) => void;
  isItemSelected: boolean;
  labelId: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        role='checkbox'
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={device._id}
        selected={isItemSelected}
      >
        <TableCell padding='checkbox'>
          <Checkbox
            onClick={() => onClick(device._id)}
            color='primary'
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
        <TableCell component='td' align='right' id={labelId} scope='row'>
          {device.location === LocationEnum.hamal ? 'חמ"ל' : 'אתר'}
        </TableCell>
        <TableCell align='right'>{hamalsConstant[device.hamal].name}</TableCell>
        <TableCell align='right'>{device.area}</TableCell>
        <TableCell align='right'>{device.ip}</TableCell>
        <TableCell align='right'>{device.deviceType}</TableCell>
        <TableCell align='right'>{device.isAlive ? 'מבצעי' : 'רזרבה'}</TableCell>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: '1rem 0' }}>
              {Object.keys(device.device).map((key) => (
                <Typography key={key} variant='body1' gutterBottom component='div'>
                  {key}:{device.device[key]}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const DevicesTable = ({
  devices,
  isDevicesLoading,
  onDelete,
  onCreateExcel,
  isExcelDevicesLoading,
}: DeviceTableProps) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && devices?.length) {
      const newSelected = devices.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = () => {
    onDelete(selected);
    setSelected([]);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DevicesTableToolbar onDelete={handleDelete} numSelected={selected.length} />
        <TableContainer>
          {devices?.length && (
            <Table
              sx={{ minWidth: 'auto', borderRadius: '5px 5px 0 0 !important' }}
              aria-labelledby='tableTitle'
            >
              <DevicesTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={devices.length}
              />
              <TableBody>
                {devices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((device, index) => {
                    const isItemSelected = isSelected(device._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <Row
                        key={device._id}
                        device={device}
                        onClick={handleClick}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                      />
                    );
                  })}
                {isDevicesLoading && <Loader />}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component='div'
          count={devices?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>

      <Box>
        <Button disabled={isExcelDevicesLoading} onClick={onCreateExcel} variant='contained'>
          {isExcelDevicesLoading ? (
            <CircularProgress color='success' />
          ) : (
            'לצור קובץ אקסל של אמצעים'
          )}
        </Button>
      </Box>
    </Box>
  );
};
