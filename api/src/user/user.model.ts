import * as uuidv4 from 'uuid/v4';

export default class UserModel {
  public id: string;
  public name: string;
  public roomId?: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}
