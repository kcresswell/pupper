import { Component } from '@angular/core';

import { MessagingPage } from '../messaging/messaging';
import { MatchingPage } from '../matching/matching';
import { SettingsPage } from '../settings/settings';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SettingsPage;
  tab2Root = MatchingPage;
  tab3Root = MessagingPage;

  // email: string;
  // password: string;

  constructor(public navParams: NavParams) {
    // this.email = navParams.get('email'); 
    // this.password = navParams.get('password'); 
    // console.log("TABS CONSTRUCTOR, YO"); 
    // console.log(this.email, this.password); 
  }

}
