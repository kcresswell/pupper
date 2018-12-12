import { Component } from '@angular/core';

import { MessagingPage } from '../messaging/messaging';
import { MatchingPage } from '../matching/matching';
import { SettingsPage } from '../settings/settings';
import { NavParams } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SettingsPage;
  tab2Root = MatchingPage;
  tab3Root = MessagingPage;
  userId: any;
  zip: any; 

  //http call to: 
  //look up match profile
  //look up user login stuff
  constructor(public navParams: NavParams, public http: Http, public globalVarsProvider: GlobalvarsProvider,
    private toastCtrl: ToastController) {
    this.userId = globalVarsProvider.getUserId();
    this.findUserProfileById(); 
    this.getMatchProfilesByUserZip(); 
  }

  //findUserProfileById
  // GET /user/{userId}
  findUserProfileById() {
    this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user/' + this.userId,
      { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(resp => {
        if (resp['status'] == 403) {
          this.presentToast("Your session has expired. Please log in again.");
          return;
        }
        else if (resp['status'] == 400 || resp['status'] == 404 || resp['status'] == 422) {
          this.presentToast("Error loading User Profile data.");
          return;
        }
        else if (resp['status'] == 200) {
          let jsonResponseObj = JSON.parse((resp['_body']));
          // let userProfileData = jsonResponseObj['userProfiles'][0]; 
          // console.log("TABS User Profile: " + JSON.stringify(userProfileData)); 
          // this.zip = userProfileData.zip;
          console.log("Zip code " + this.zip); 
        }
      }, error => console.log(error)
      );
  }

  //getMatchProfilesByUserZip
  //GET /matchProfile
  getMatchProfilesByUserZip(){
    this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/matchProfile?zip=' + this.zip,
      { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(resp => {
        if (resp['status'] == 403) {
          this.presentToast("Your session has expired. Please log in again.");
          return;
        }
        else if (resp['status'] == 400 || resp['status'] == 404 || resp['status'] == 422) {
          this.presentToast("Error loading Match Profile data.");
          return;
        }
        else if (resp['status'] == 200) {
          let jsonResponseObj = JSON.parse((resp['_body']));
          // let matchProfileData = jsonResponseObj['matchProfile'][0]; //TODO: figure out what the object name is here 
          console.log("TABS Match Profile: " + JSON.stringify(jsonResponseObj));  //TABS Match Profile: []
          // this.globalVarsProvider.setUserMatchProfile(); //TODO: fill this in when returning right matchProfile obj
        }
      }, error => console.log(error)
      );
  }

  presentToast(msgToDisplay) {
    let toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
