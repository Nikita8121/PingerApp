import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket } from 'dgram';
import { AddressService } from './address.service';
import { PingResultDto } from './dto/ping-result.dto';
import { AddressesPingDto } from './dto/address-ping.dto';

@WebSocketGateway({
  cors: {
    origin: ['http://127.0.0.1:5173'],
  },
  transports: ['websocket'],
})
export class AddressGateway {
  constructor(private readonly addressService: AddressService) {}

  emitPing(client: Socket, data: PingResultDto) {
    client.emit('ping', data);
  }

  @SubscribeMessage('newPing')
  @UsePipes(new ValidationPipe())
  onNewPing(
    @MessageBody() body: AddressesPingDto,
    @ConnectedSocket() client: Socket,
  ) {
    const onPingSucceed = (data: PingResultDto) => {
      this.emitPing(client, data);
    };
    this.addressService.getPingAddressesResults(body, onPingSucceed);
  }
}
