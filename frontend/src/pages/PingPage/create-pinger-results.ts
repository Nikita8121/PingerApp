import { download } from '@/shared/helpers/downlaod-excel-file';
import { IPingDevicesMessage } from '@/shared/types/index.interface';
import Excel from 'exceljs';

const columns = [
  { key: 'ip', header: 'ip' },
  { key: 'isAlive', header: 'סטטוס' },
];

export const createExcelFromPingerResult = async (results: IPingDevicesMessage[]) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Ping Results');
  worksheet.columns = columns;
  results.forEach((result) => {
    worksheet.addRow({ ip: result.ip, isAlive: result.isAlive ? 'מבצעי' : 'רזרבה' });
  });

  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.font = {
      size: 12,
    };
    sheetColumn.width = 30;
  });

  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };
  download(workbook);
};
