import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
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

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController, public globalVarsProvider: GlobalvarsProvider) {
    console.log('Login page constructor');
  }

  login() {

    const autoFillFieldsForTesting = false;

    if (autoFillFieldsForTesting) {
      this.email = "test@test.com";
      this.password = "password";
    }
    console.log('Login button clicked');

    if (this.userInputIsValid()) {

      // let headers = new HttpHeaders({'Content-Type':'application/json'});
      const headers = new Headers({ 'Content-Type': 'application/json' });

      let loginData = JSON.stringify({
        username: this.email,
        password: this.password
      });

      //this.http.post('http://localhost:5000/login', loginData, { headers: headers }) //For running back-end locally
      this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', loginData, { headers: headers }) //For running back-end in AWS
      .subscribe(result => {
        // console.log(result['_body']);
        console.log('Response status code: ' + result['status']);

        if (result['status'] == 403) {
          //Invalid credentials
          let errorMsg = "Invalid login credentials, please try again.";
          this.presentToast(errorMsg);
        }
        else if (result['status'] == 200) {
          //Success! navigate user to the next page
          let loginSuccess = "Login success. Please wait . . .";
          this.presentToast(loginSuccess);

          this.retrieveUserProfile(result);
        }
      },
      error => console.log(error)
    );
  }
}

retrieveUserProfile(response) {
  let jwtAccessToken = response.headers.get("Authorization");
  this.globalVarsProvider.setJwtAccessToken(jwtAccessToken);
  console.log(jwtAccessToken);

  let headers = new Headers({'Content-Type':'application/json', 'Authorization': jwtAccessToken});

  this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user', {headers: headers})
  //this.http.get('http://localhost:5000/user?email=' + this.email, {headers: headers})
  .subscribe(resp => {
    if (resp['status'] == 403) {
      this.presentToast("Your session has expired. Please log in again.");
      return;
    }
    else if (resp['status'] == 400 || resp['status'] == 404 || resp['status'] == 422) {
      let errorMsg = "Error loading User Profile data.";
      this.presentToast(errorMsg);
      return;
    }
    else if (resp['status'] == 200) {
      console.log("Generic response message: " + resp);
      console.log("response body: " + resp['_body']);

      let jsonResponseObj = JSON.parse((resp['_body'])); //Parse response body string resp['_body']into JSON object to extract data
      let userProfileData = jsonResponseObj['userProfiles'][0]; //User profile data is contained in 'userProfiles' as arraylist
      console.log("User profile: '" + JSON.stringify(userProfileData) + "'");

      //this.updateLastLoginTimestampForUserProfile(userProfileData, headers);

      //TODO: Make a second update call to userProfile table to update lastLogin for userProfile.

      this.navCtrl.push(TabsPage, userProfileData); //Pass userProfile object to next page using NavController.push()
    }
  },
  error => console.log(error)
);

}

updateLastLoginTimestampForUserProfile(userProfileObj, headersWithAuth) {
  // console.log(headersWithAuth.get('Authorization'));
  console.log("Previous last login: '" + userProfileObj['lastLogin'] + "'");

  let userAccountObj = userProfileObj['userAccount'];
  const userAccountId = userAccountObj['id'];

  //TODO: figure out how to pass user account field in without nulled out password field and with hashed value instead
  userAccountObj = JSON.stringify({
    id: userAccountId,
    username: this.email,
    password: this.password
  });

  const lastLoginUpdatedValue = new Date();
  console.log("Updating last login value to " + lastLoginUpdatedValue.toLocaleString().replace(new RegExp("/", 'g'), "-"));

  userProfileObj['lastLogin'] = lastLoginUpdatedValue;

  this.http.put('http://localhost:5000/user/' + userProfileObj['id'], userProfileObj, headersWithAuth)
  .subscribe(resp => {
    if (resp['status'] == 200) {
      console.log('Update to lastLogin for user was successful.');
    }
  },
  error => console.log(error)
);

}

userInputIsValid() {
  if (!this.email || !this.password || !this.validateEmailFormat(this.email)) {
    let errorMsg = "Please enter a valid email and password.";
    this.presentToast(errorMsg);
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
    duration: 3000,
    position: 'middle'
  });

  toast.present();
}

}
