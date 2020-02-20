export default class ChangeRoomModel {
  public userId: string;
  public roomId?: string;

  constructor(userId: string, roomId?: string) {
    this.userId = userId;
    this.roomId = roomId;
  }
}
