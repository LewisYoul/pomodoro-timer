import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimerConfigProvider {
  CONFIGS = {
    pomodoro: {
      name: 'pomodoro',
      time: moment.duration(1, 'minutes'),
    },
    shortBreak: {
      name: 'short-break',
      time: moment.duration(5, 'seconds'),
    },
    longBreak: {
      name: 'long-break',
      time: moment.duration(10, 'seconds'),
    }
  }
  constructor() {}

  configFor(timerType) {
    return this.CONFIGS[timerType]
  }
}
