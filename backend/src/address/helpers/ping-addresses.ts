import { PingerHelperService } from 'src/utils/pingerHelper/pingerHelper.service';
import { PingResultDto } from '../dto/ping-result.dto';

const lastAddress = 254;

export async function pingAddresses(
  ipWithoutDeviceNum: string,
  onPingSucceed: (data: PingResultDto) => void,
  pingerService: PingerHelperService,
): Promise<any> {
  const promises = [];
  for (let addressNumber = 1; addressNumber <= lastAddress; addressNumber++) {
    promises.push(
      pingerService
        .isHostAlive(ipWithoutDeviceNum + addressNumber)
        .then((result) => {
          onPingSucceed(result);
        }),
    );
  }
  return Promise.all(promises);
}
