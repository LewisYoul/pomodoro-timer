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

  describe('#getConfigFor', () => {
    let timerConfig;
    const mockDuration = moment.duration(5, 'seconds');

    beforeEach(() => {
      timerConfig = fixture.debugElement.injector.get(TimerConfigProvider);
      spyOn(timerConfig, 'configFor').and.returnValue({ time: mockDuration })
      component.getConfigFor('pomodoro')
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
