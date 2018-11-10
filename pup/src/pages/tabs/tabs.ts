import { Component } from '@angular/core';

import { MessagingPage } from '../messaging/messaging';
import { MatchingPage } from '../matching/matching';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MessagingPage;
  tab3Root = MatchingPage;

  constructor() {

  }
}
