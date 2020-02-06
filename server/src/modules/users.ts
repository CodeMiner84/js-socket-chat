import * as SocketIO from "socket.io";
import {addNickName, getAllNickNames} from "../redis/nickaname";
import NicknameDto from "../models/nickname.dto";
import events from '../config/events';

export async function watchNickNames (socket: SocketIO.Server) {
  socket.on(events.SET_NICKNAME, async function (data: NicknameDto) {
    try {
      await addNickName(data.value);

      socket.emit(events.NICKNAME_ADDED, data.value);
    } catch (error) {
      socket.emit(events.NICKNAME_ALREADY_EXISTS);
    }
  });
}
