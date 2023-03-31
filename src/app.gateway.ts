import {SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection() {
    console.log('Client connected');
  }

  handleDisconnect() {
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('Received message:', payload);
    return 'Message received';
  }
}