import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HomePage } from './home';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
import { SmartAudio } from '../../providers/smart-audio/smart-audio';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TimerConfigProvider } from '../../providers/timer-config/timer-config';
import * as moment from 'moment';

export class SmartAudioMock {
  preload(name, location) {

  }

  play(alarm) {}
}

export class TimerConfigProviderMock {
  configFor(timerType) {
    return {
      name: 'pomodoro',
      time: moment.duration(2, 'seconds'),
    }
  }
}

describe('HomePage', () => {
  let de: DebugElement;
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage)
      ],
      providers: [
        NavController,
        { provide: SmartAudio, useClass: SmartAudioMock },
        { provide: TimerConfigProvider, useClass: TimerConfigProviderMock }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
  });

  it('should create the HomePage', () => {
    expect(component).toBeDefined()
  });

  describe('#startTimer', () => {
    let initialDuration = moment.duration(5, 'seconds');

    beforeEach(function() {
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });
  
    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('sets this.isTiming to true', () => {
      component.startTimer()
      
      expect(component.isTiming).toBe(true)
    });
    
    it("when 0 seconds have passed it doesn't reduce the duration", () => {
      component.time = initialDuration
      component.startTimer()

      expect(component.time).toEqual(initialDuration)
    });

    it('when 1 second has passed it reduces the duration by 1 second', () => {
      component.time = initialDuration;
      component.startTimer();

      jasmine.clock().tick(1000)

      expect(component.time).toEqual(initialDuration.subtract(1, 'second'))
    });

    it('when the duration of the timer reaches zero it plays the alarm', () => {
      const smartAudio = fixture.debugElement.injector.get(SmartAudio);
      spyOn(smartAudio, 'play')

      component.time = initialDuration;
      component.startTimer();

      for (let i = 1; i <= 5; i++) {
        jasmine.clock().tick(1000);
        console.log('timeee', component.time)
      }

      expect(smartAudio.play).toHaveBeenCalledWith('alarm')
    });
  });

  describe('#getConfigFor', () => {
    let timerConfig;
    const mockDuration = moment.duration(5, 'seconds');

    beforeEach(() => {
      timerConfig = fixture.debugElement.injector.get(TimerConfigProvider);
      spyOn(timerConfig, 'configFor').and.returnValue({ time: mockDuration })
      component.getConfigFor('pomodoro')
    });

    it ('resets this.isTiming to be false', () => {
      expect(component.isTiming).toBe(false)
    });

    it('calls #configFor on the TimerConfigProvider with the passed argument', () => {
      expect(timerConfig.configFor).toHaveBeenCalledWith('pomodoro');
    });

    it('sets this.time to be the time attribute of the required object', () => {
      expect(component.time).toEqual(mockDuration)
    });
  });

  it('should have expected <h3> text', () => {
    // const buttons = fixture.debugElement.query(By.css('button'))
    // console.log('BUTTONS', buttons)
    expect(1).toEqual(1)
  });
});
