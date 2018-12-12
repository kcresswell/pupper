import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController,
    public globalVarsProvider: GlobalvarsProvider) {
  }

  login() {
    if (this.userInputIsValid()) {
      const headers = new Headers({ 'Content-Type': 'application/json' });

      let loginData = JSON.stringify({
        username: this.email,
        password: this.password
      });

      this.http.post(this.globalVarsProvider.getServerBaseUrl() + '/login',
        loginData, { headers: headers })
        .subscribe(response => {
          if (response['status'] == 403) {
            this.presentToast("Invalid login credentials, please try again.");
          }
          else if (response['status'] == 200) {
            this.presentToast("Login success! Happy Puppering.");
            this.extractAuthHeadersFromLoginSuccessResponse(response);
            this.retrieveUserProfileForLastLoginUpdate();
          }
        },
          error => console.log(error)
        );
    }
  }

  //Retrieves Authorization from successful login
  extractAuthHeadersFromLoginSuccessResponse(response) {
    const jwtAccessToken = response.headers.get("Authorization");
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwtAccessToken });
    this.globalVarsProvider.setHeadersWithAuthToken(headers);

    //TODO: if the login is in correct it will have the following header:
    //the response body is empty if the password is incorrect
    // this.presentToast("Invalid login credentials, please try again.");

  }

  retrieveUserProfileForLastLoginUpdate() {
    this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user?email=' + this.email,
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
          let userProfileData = jsonResponseObj['userProfiles'][0];

          let userId = userProfileData['id'];
          this.globalVarsProvider.setUserId(userId);
          this.globalVarsProvider.setUserProfileData(userProfileData);

          this.updateLastLoginTimestampForUserProfile(userProfileData);

          this.navCtrl.push(TabsPage);
        }
      }, error => console.log(error)
      );

  }

  updateLastLoginTimestampForUserProfile(userProfileObj) {
    let userAccountObj = userProfileObj['userAccount'];
    const userAccountId = userAccountObj['id'];

    userAccountObj = JSON.stringify({
      id: userAccountId,
      username: this.email,
      password: this.password
    });

    const lastLoginDate = this.getCurrentDateInValidFormat();

    const updateLastLoginUrlString = this.globalVarsProvider.getServerBaseUrl() +
      "/user/" + userProfileObj['id'] + "?lastLogin=" + lastLoginDate;
    console.log("sending put request to " + updateLastLoginUrlString);
    this.http.put(updateLastLoginUrlString, userProfileObj, { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(resp => {
        if (resp['status'] == 200) {
          console.log('Update to lastLogin for user was successful.');
        }
      }, error => console.log(error));
  }

  userInputIsValid() {
    if (!this.email || !this.password || !this.validateEmailFormat(this.email)) {
      this.presentToast("Please enter valid login credentials.");
      return false;
    }
    return true;
  }

  validateEmailFormat(emailIn): boolean {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegEx.test(emailIn);
  }

  presentToast(msgToDisplay) {
    let toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  getCurrentDateInValidFormat() {
    const today = new Date();
    //Months are 0 indexed so increment month by 1
    const monthVal = today.getMonth() + 1;
    const monthString = monthVal < 10 ? "0" + monthVal : monthVal;
    const dayString = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    return today.getFullYear() + "-" + monthString + "-" + dayString;
  }
}
