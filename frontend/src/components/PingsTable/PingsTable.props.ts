import { IPingDevicesMessage } from "@/shared/types/index.interface";


export interface PingTableProps {
  data: IPingDevicesMessage[];
  createExcel: () => void;
  isPingsPending: boolean;
  makeNewPings: () => void;
}
