import {Express} from "express";
import {createServer, Server} from "http";
import * as SocketIO from "socket.io";
import {listenRooms} from "../modules/room/room.action";
import {listenUsers} from "../modules/users";

export default class SocketListener {
  private server: Server = {} as Server;
  private io: SocketIO.Server;
  private port: number = 8080;

  public constructor(
    app: Express,
   ) {
    this.server = createServer(app);
    this.io = SocketIO(this.server);
  }

  public listen(): void {
    this.serverListening();
    this.listenOnEvents();
  }

  private serverListening(): void {
    this.server.listen(this.port, () => {
      console.log('Server listening at port %d', this.port);
    });
  }

  private listenOnEvents(): void {
    this.io.on('connection', async (socket: SocketIO.Socket) => {
      listenRooms(this.io, socket);
      listenUsers(socket);
    });
  }
}
