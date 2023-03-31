import { saveAs } from 'file-saver';
import Excel from 'exceljs';

export function download(workbook: Excel.Workbook) {
  workbook.xlsx.writeBuffer().then(function (data) {
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'fileName.xlsx');
  });
}
