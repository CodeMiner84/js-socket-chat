import io from 'socket.io-client';
import config from '../config';

export default class SocketService {
  public socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(): void {
    console.log('init in SocketService');

    this.socket = io(process.env.REACT_APP_API_URL as string);
  }

  public disconnect(): void {
    console.log('disconnecting');
    this.socket.emit('disconnect');
  }

  public getUsers(): void {
    console.log('show in SocketService');
  }
}
