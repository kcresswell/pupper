import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { MatchingPage } from '../pages/matching/matching';
import { MessagingPage } from '../pages/messaging/messaging';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DogProfilePage} from '../pages/dogProfile/dogProfile'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';

//import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    MyApp,
    MatchingPage,
    MessagingPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    DogProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MatchingPage,
    MessagingPage,
    HomePage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TabsPage,
    DogProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
