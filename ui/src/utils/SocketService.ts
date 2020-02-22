import io from 'socket.io-client';
import React, { createContext, useContext } from 'react';

export default class SocketService {
  public socket: SocketIOClient.Socket | any = {} as SocketIOClient.Socket;

  public init(): void {
    this.socket = io(process.env.REACT_APP_API_URL as string);
  }

  public disconnect(): void {
    this.socket.emit('disconnect');
  }
}

export const ChatContext: React.Context<SocketService> = createContext(new SocketService());
export const useChat = () => useContext(ChatContext);
