import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { CreateDogProfilePage } from '../createdogprofile/createdogprofile';
import { MatchingPage } from '../matching/matching';
import { MessagingPage } from '../messaging/messaging';
import { SignupPage } from '../signup/signup';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CreateDogProfilePage;
  tab2Root = LoginPage;
  tab3Root = MatchingPage;
  tab4Root = MessagingPage; 
  tab5Root = SignupPage;

  constructor() {

  }
}
