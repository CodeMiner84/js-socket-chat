import * as uuidv4 from "uuid/v4";

export default class RoomModel {
  public id: string;
  public name: string;

  constructor(
    name: string
  ) {
    this.id = uuidv4();
    this.name = name;
  }
}
