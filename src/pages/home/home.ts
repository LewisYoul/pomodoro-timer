import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';
import * as moment from 'moment';
import { TimerConfigProvider } from '../../providers/timer-config/timer-config';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  timerType = null;
  time = moment.duration(10, 'seconds');
  countdownTimer = null;
  isTiming = false;

  constructor(
    public navCtrl: NavController,
    private smartAudio: SmartAudio, 
    private timerConfig: TimerConfigProvider, 
  ) {
    this.smartAudio.preload('alarm', 'assets/audio/alarm.mp3');
    this.getConfigFor('pomodoro');
  }

  startTimer() {
    this.isTiming = true;
    this.countdownTimer = setInterval(() => {
      this.time.subtract(1, 'second');
      
      if (moment.duration(0, 'minutes').asMilliseconds() == this.time.asMilliseconds()) {
        this.smartAudio.play('alarm');
        clearInterval(this.countdownTimer)
      }
    }, 1000);
  }

  clicked(activeType) {
    if (activeType === this.timerType.name) {
      return { 'background-color': '#FBE8A6' }
    }
  }

  stopTimer(event) {
    event.preventDefault()
    clearInterval(this.countdownTimer);
    this.isTiming = false;
  }
  
  resetTimer() {
    this.time = this.timerType['time'].clone();
    this.isTiming = false;
  }

  formattedTime() {
    return `${this.time.minutes()}:${this.formattedSeconds()}`
  }

  formattedSeconds() {
    const seconds = this.time.seconds().toString()

    if (seconds.length < 2) {
      return `0${seconds}`
    } else {
      return seconds
    }
  }

  getConfigFor(timerType) {
    this.timerType = this.timerConfig.configFor(timerType)
    this.time = this.timerType['time'].clone();
  }

}
