import * as SocketIO from "socket.io";
import * as uuidv4 from 'uuid/v4';
import {getUser, getUserRoom} from "../redis/user";
import events from '../config/events';
import InputMessageDto from "../models/input.message.dto";
import MessageDto from "../models/message.dto";
import {addMessage, getMessages} from "../redis/message";

export async function messageListeners (io: SocketIO.Server, socket: any) {
  socket.on(events.FETCH_MESSAGES, async function(userId: any) {
    console.log(`Fetching messages from room: ${userId.userId}`);
    const connectedRoom = await getUserRoom(userId.userId);
    if (!connectedRoom) {
      throw Error("You need to connect to room");
    }

    const messages = await getMessages(connectedRoom.id);
    await io.sockets.in(connectedRoom.id).emit(events.GET_MESSAGES, messages);
    console.log(`Fetched ${messages.length} messages`);
  })

  socket.on(events.ADD_MESSAGE, async function (input: InputMessageDto) {
    try {
      console.log('Input message ', input);
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

      await io.sockets.in(connectedRoom.id).emit(events.RECEIVE_MESSAGE, message);
      console.log(`Emit receiveMessage event from ${connectedRoom.id} with message: ${input.message}`);
    } catch (error) {
      console.log('error', error);
    }
  });
}
