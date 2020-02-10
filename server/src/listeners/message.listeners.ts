import * as SocketIO from "socket.io";
import * as uuidv4 from 'uuid/v4';
import {addUser, getAllUsers, getUserRoom} from "../redis/user";
import UserDto from "../models/user.dto";
import events from '../config/events';
import InputDto from "../common/input.dto";
import InputMessageDto from "../models/input.message.dto";
import MessageDto from "../models/message.dto";

export async function messageListeners (io: SocketIO.Server, socket: any) {
  socket.on(events.ADD_MESSAGE, async function (input: InputMessageDto) {
    try {
      console.log('input', input);

      const connectedRoom = await getUserRoom(input.userId);
      if (!connectedRoom) {
        throw Error("You need to connect to room");
      }

      const user: MessageDto = {
        id: uuidv4(),
        message: input.message,
        userId: input.userId
      };

      io.sockets.in(connectedRoom).emit(events.RECEIVE_MESSAGE, { message: input.message, user: input.userId });

      console.log(`Emit receiveMessage event from ${connectedRoom} with message: ${input.message}`);
    } catch (error) {
      console.log('error', error);
      // socket.emit(events.USER_ALREADY_EXISTS);
    }
  });
}
