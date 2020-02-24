import { Logger as NestLogger } from '@nestjs/common';

export default class Logger extends NestLogger {
  onStartEvent(eventName: string) {
    this.debug(`EVENT START: [${eventName}]`);
  }

  onLeaveEvent(eventName: string) {
    this.debug(`EVENT LEAVE: [${eventName}]`);
  }
}
