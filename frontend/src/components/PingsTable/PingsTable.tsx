import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ButtonGroup,
  Button,
} from '@mui/material';
import { PingTableProps } from './PingsTable.props';

export const PingsTable = ({ data, makeNewPings, createExcel, isPingsPending }: PingTableProps) => {
  return (
    <>
      <TableContainer sx={{ maxHeight: '70vh' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='ping result'>
          <TableHead>
            <TableRow>
              <TableCell>IP</TableCell>
              <TableCell align='right'>סטטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.ip} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {item.ip}
                </TableCell>
                <TableCell align='right'>{item.isAlive ? 'מבצעי' : 'רזרבה'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isPingsPending ? (
        <ButtonGroup
          sx={{ marginTop: '1rem' }}
          variant='contained'
          aria-label='outlined primary button group'
        >
          <Button sx={{ marginLeft: '10px' }} onClick={makeNewPings}>
            לעשות פינגים חדשים
          </Button>
          <Button onClick={createExcel}>לצור קובץ אקסל</Button>
        </ButtonGroup>
      ) : null}
    </>
  );
};
