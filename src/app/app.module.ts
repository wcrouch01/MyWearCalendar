import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsSetPage } from '../pages/settings-set/settings-set';
import { CalendarSetPage } from '../pages/calendar-set/calendar-set';
import { Slide } from '../pages/slide';
import { FeedbackPage } from '../pages/feedback/feedback';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { Calendar } from '@ionic-native/calendar';
import { IonicStorageModule } from '@ionic/storage';
import { MyglobalsProvider } from '../providers/myglobals/myglobals';
import { Deeplinks } from '@ionic-native/deeplinks';
import { NativeGeocoder } from '@ionic-native/native-geocoder';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsSetPage,
    CalendarSetPage,
    FeedbackPage,
    Slide
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsSetPage,
    CalendarSetPage,
    FeedbackPage,
    Slide
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Calendar,
    MyglobalsProvider,
    Deeplinks
  ]
})
export class AppModule {}
