import { Injectable } from '@nestjs/common';
const ping = require('ping');

interface IPingerServiceResponse {
  inputHost: string;
  host: string;
  alive: boolean;
  output: string;
  time: string;
  times: any[];
  min: string;
  max: string;
  avg: string;
  stddev: string;
  packetLoss: string;
  numeric_host: string;
}

interface IIsHostAliveFuncResponse {
  ip: string;
  isAlive: boolean;
}

const cnf = {
  min_reply: 1,
}

@Injectable()
export class PingerHelperService {
  constructor() {}
  async isHostAlive(host: string): Promise<IIsHostAliveFuncResponse> {
    const data: IPingerServiceResponse = await ping.promise.probe(host, cnf);
    return {
      ip: data.host,
      isAlive: data.alive,
    };
  }
}
