import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { MatchingPage } from '../pages/matching/matching';
import { MessagingPage } from '../pages/messaging/messaging';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { DogProfilePage} from '../pages/dogProfile/dogProfile';
import { DogProfilePicPage } from '../pages/dogProfilePic/dogProfilePic'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { SwipeCardsModule } from 'ng2-swipe-cards';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {Camera} from '@ionic-native/camera';
import { ChatProvider } from '../providers/chat/chat';


@NgModule({
  declarations: [
    MyApp,
    MatchingPage,
    MessagingPage,
    SettingsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    DogProfilePage,
    DogProfilePicPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    SwipeCardsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MatchingPage,
    MessagingPage,
    SettingsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    DogProfilePage,
    DogProfilePicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ChatProvider
  ]
})
export class AppModule {}
