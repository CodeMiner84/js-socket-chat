import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as SocketIO from "socket.io";
import {createServer, Server} from "http";
import {listenRooms} from "./room.listeners";
import {listenUsers} from "./user.listeners";
import {messageListeners} from "./message.listeners";

export default class SocketListener {
  private readonly server: Server = {} as Server;
  private readonly io: SocketIO.Server;
  private port: number = 8080;

  public constructor() {
    const app = express();

    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));

    this.server = createServer(app);
    this.io = SocketIO(this.server);
  }

  public listen(): void {
    this.serverListening();
    this.eventsListening();
  }

  private serverListening(): void {
    this.server.listen(this.port, () => {
      console.log('Server listening at port %d', this.port);
    });
  }

  private eventsListening(): void {
    this.io.on('connection', async (socket: SocketIO.Socket) => {
      listenRooms(this.io, socket);
      listenUsers(socket);
      messageListeners(this.io, socket);

      socket.on('disconnect', async () => {
        console.log('DISCONNECTING FROM APP');
      })
    });
  }
}
