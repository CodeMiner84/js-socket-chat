import MessageModel from "./message.model";

export default class MessageFactory {
  public static createConnectedNotification(userId: string, userName: string) {
    return new MessageModel(
      `${userName} connect`,
      userId,
      null,
      true
    );
  }

  public static createDisconnectedNotification(userId: string, userName: string) {
    return new MessageModel(
      `${userName} disconnect`,
      userId,
      null,
      true
    );
  }
}
