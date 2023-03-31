import { IArea, IHamal, componentsType } from '@/shared/api/device.api/device.api.interfaces';
import { hamalsConstant } from '@/shared/constants/index.constants';
import { download } from '@/shared/helpers/downlaod-excel-file';
import Excel from 'exceljs';


const columns = [
  { key: 'atar', header: 'אתר' },
  { key: 'status', header: 'סטטוס' },
  { key: 'device', header: 'אמצעי' },
  { key: 'parameter', header: 'מרכיב' },
  { key: 'ip', header: 'ip' },
  { key: 'port', header: 'port' },
  { key: 'mars', header: 'מר"ס MC' },
  { key: 'marsPort', header: 'Port MC' },
  { key: 'proxyPort', header: 'Proxy Port' },
  { key: 'proxyIp', header: 'Proxy Ip' },
  { key: 'subnetMask', header: 'Subnet Mask' },
  { key: 'df', header: 'DF' },
];

const cellSettings: Partial<Excel.Alignment> = {
  vertical: 'middle',
  horizontal: 'center',
};

// create sheet for all hamal's

export const createDevicesExcel = (hamals: IHamal[]) => {
  const workbook = new Excel.Workbook();

  const getRowHeight = (components: componentsType) => {
    return Object.keys(components).length;
  };

  const getAreaHeight = (area: IArea) => {
    return area.devices.reduce<number>((acc, device) => {
      return acc + getRowHeight(device.components);
    }, 0);
  };

  hamals.forEach((hamal) => {
    const worksheet = workbook.addWorksheet(hamalsConstant[hamal.hamal].name);
    worksheet.properties.defaultColWidth = 15;
    worksheet.columns = columns;

    let currentAreaRow = 2;
    let currentDeviceRow = 2;
    hamal.areas.forEach((area) => {
      //#region setting areas
      worksheet.getCell(`A${currentAreaRow}`).value = area.area;
      worksheet.getCell(`A${currentAreaRow}`).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      const areaHeight = getAreaHeight(area) - 1;
      worksheet.mergeCells(`A${currentAreaRow}`, `A${currentAreaRow + areaHeight}`);
      //#endregion
      currentAreaRow = currentAreaRow + areaHeight + 1;

      area.devices.forEach((device) => {
        const rowHeight = getRowHeight(device.components) - 1;
        //#region setting statuses
        worksheet.getCell(`B${currentDeviceRow}`).value = device.isAlive ? 'מבצעי' : ' רזרבה';
        worksheet.getCell(`B${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`B${currentDeviceRow}`, `B${currentDeviceRow + rowHeight}`);
        //#endregion

        //#region setting device type
        worksheet.getCell(`C${currentDeviceRow}`).value = device.deviceType;
        worksheet.getCell(`C${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`C${currentDeviceRow}`, `C${currentDeviceRow + rowHeight}`);
        //#endregion

        //#region setting proxy port
        worksheet.getCell(`I${currentDeviceRow}`).value = device.device.ProxyPort || '-';
        worksheet.getCell(`I${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`I${currentDeviceRow}`, `I${currentDeviceRow + rowHeight}`);
        //#endregion

        //#region setting proxyIp
        worksheet.getCell(`J${currentDeviceRow}`).value = device.device.proxyIP || '-';
        worksheet.getCell(`J${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`J${currentDeviceRow}`, `J${currentDeviceRow + rowHeight}`);
        //#endregion

        //#region setting subnet mask
        worksheet.getCell(`K${currentDeviceRow}`).value = device.device.subMask || '-';
        worksheet.getCell(`K${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`K${currentDeviceRow}`, `K${currentDeviceRow + rowHeight}`);
        //#endregion

        //#region setting default gateway
        worksheet.getCell(`L${currentDeviceRow}`).value = device.device.DefaultGateway || '-';
        worksheet.getCell(`L${currentDeviceRow}`).alignment = cellSettings;
        worksheet.mergeCells(`L${currentDeviceRow}`, `L${currentDeviceRow + rowHeight}`);
        //#endregion

        Object.keys(device.components).forEach((componentKey, componentIndex) => {
          const currentSubRow = currentDeviceRow + componentIndex;

          const nameCell = worksheet.getCell(`D${currentSubRow}`);
          nameCell.value = device.components[componentKey].name;
          nameCell.alignment = cellSettings;

          const ipCell = worksheet.getCell(`E${currentSubRow}`);
          ipCell.value = device.components[componentKey].values.ip || '-';
          ipCell.alignment = cellSettings;

          worksheet.getCell(`F${currentSubRow}`).value =
            device.components[componentKey].values.port || '-';

          worksheet.getCell(`G${currentSubRow}`).value =
            device.components[componentKey].values.MC || '-';

          worksheet.getCell(`H${currentSubRow}`).value =
            device.components[componentKey].values.portMC || '-';
        });

        currentDeviceRow = currentDeviceRow + rowHeight + 1;
      });
    });

    // add new rows and return them as array of row objects
    /* worksheet.mergeCells('A2:A3'); */
  });
  download(workbook);
};
