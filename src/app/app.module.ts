import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { NativeAudio } from '@ionic-native/native-audio';
import { TimerConfigProvider } from '../providers/timer-config/timer-config';

import { MyApp } from './app.component';
import { Page2Module } from '../pages/page2/page2.module';
import { Page1Module } from '../pages/page1/page1.module';
import { HomePageModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HomePageModule,
    Page1Module,
    Page2Module,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SmartAudio,
    NativeAudio,
    TimerConfigProvider,
  ]
})
export class AppModule { }
