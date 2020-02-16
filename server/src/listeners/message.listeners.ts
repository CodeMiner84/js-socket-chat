import * as SocketIO from "socket.io";
import * as uuidv4 from 'uuid/v4';
import {getUser, getUserRoom} from "../redis/user";
import events from '../config/events';
import InputMessageDto from "../models/input.message.dto";
import MessageDto from "../models/message.dto";
import {addMessage, getMessages} from "../redis/message";
import InputDto from "../models/input.dto";

export async function messageListeners (io: SocketIO.Server, socket: SocketIO.Socket) {
  socket.on(events.FETCH_MESSAGES, async function(input: InputDto) {
    const connectedRoom = await getUserRoom(input.value);
    if (!connectedRoom) {
      throw Error("You need to connect to room");
    }

    const messages = await getMessages(connectedRoom.id);
    await socket.emit(events.MESSAGES_FETCHED, messages);
  })

  socket.on(events.ADD_MESSAGE, async function (input: InputMessageDto) {
    try {
      const connectedRoom = await getUserRoom(input.userId);
      if (!connectedRoom.id) {
        throw Error("You need to connect to room");
      }
      const user = await getUser(input.userId);
      const message: MessageDto = {
        id: uuidv4(),
        message: input.message,
        user: user.name,
        created: (new Date()).toLocaleString()
      };

      await addMessage(connectedRoom.id, message);

      await io.sockets.in(connectedRoom.id).emit(events.MESSAGE_RECEIVED, message);
    } catch (error) {
      console.log('error', error);
    }
  });
}
