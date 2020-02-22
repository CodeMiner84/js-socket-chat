import * as uuidv4 from "uuid/v4";

export default class MessageModel {
  public id: string;
  public message: string;
  public userId: string;
  public userName: string;
  public created: string;
  public info: boolean;

  public constructor(
    message: string,
    userId: string,
    userName: string,
    info?: boolean
  ) {
    this.id = uuidv4();
    this.message = message;
    this.userId = userId;
    this.userName = userName;
    this.created = (new Date()).toLocaleString();
    this.info = info || false;
  }
}
