import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { environment as ENV } from '../../environments/environment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  zip: string;
  maritalStatus: any;
  sex: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: Http, private toastCtrl: ToastController,
    public globalVarsProvider: GlobalvarsProvider) {
  }

  createUserAccountAndProfile() {
    if (this.userInputIsValid()) {

      const headers = new Headers({ 'Content-Type': 'application/json' });

      let signupData = JSON.stringify({
        username: this.email,
        password: this.password
      });

      this.http.post(ENV.BASE_URL + '/account/register',
        signupData, { headers: headers })
        .subscribe(result => {
          if (result['status'] == 409) {
            this.presentToast("A user account with your selected username already exists." +
              "Please login as an existing user or create a user profile using a unique username.");
            return;
          }
          else if (result['status'] == 200) {
            let jsonResponseObj = JSON.parse((result['_body'])); //Parse response body string resp['_body']into JSON object to extract data
            let userAccountObj = jsonResponseObj['userAccounts'][0]; //Pass the userAccount in the response to createUserProfile()
            let userId = userAccountObj['id'];
            this.globalVarsProvider.setUserId(userId);

            this.userLogin(signupData, headers, userAccountObj);
          }
        }, error => console.log(error));
    }
  }

  userLogin(userCredentials, headers, userAccountObj) {
    this.http.post(ENV.BASE_URL + '/login',
      userCredentials, { headers: headers })
      .subscribe(response => {
        if (response['status'] == 403) {
          this.presentToast("Invalid login credentials.");
          return;
        }
        else if (response['status'] == 200) {
          const jwt = response.headers.get("Authorization");
          const headersWithAuth = new Headers({
            'Content-Type': 'application/json',
            'Authorization': jwt
          });
          this.globalVarsProvider.setHeadersWithAuthToken(headersWithAuth);

          this.createUserProfile(userAccountObj);
        }
      }, error => console.log(error)
      );
  }

  createUserProfile(userAccountObj) {
    if (this.userInputIsValid()) {

      const today = this.getCurrentDateInValidFormat();
      let userProfileData = JSON.stringify({
        firstName: this.firstName,
        lastName: this.lastName,
        birthdate: this.birthdate,
        zip: this.zip,
        maritalStatus: this.maritalStatus,
        sex: this.sex,
        dateJoin: today,
        lastLogin: today,
        userAccount: userAccountObj
      });
      console.log("THIS IS THE BIRTHDATE: " + this.birthdate);
      console.log(userProfileData);

      this.http.post(ENV.BASE_URL + '/user',
        userProfileData,
        { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
        .subscribe(result => {
          if (result['status'] == 200) {
            console.log(result);
            this.presentToast("User Profile Created! Please wait ...");

            this.navCtrl.push(TabsPage, {}, { animate: true });
          }
          else if (result['status'] == 400 || result['status'] == 404) {
            this.presentToast("There's an error with one of your userProfile fields," +
              " this status code should never happen.");
          }
        },
          error => console.log(error)
        );
    }
  }

  userInputIsValid() {
    if (!this.email || !this.validateEmailFormat(this.email)) {
      this.presentToast("Please enter a valid email");
      return false;
    }

    if (!this.password || !this.validatePasswordFormat(this.password)) {
      this.presentToast("A valid password is a minimum of 8 characters, with "
        + "at least one capital letter, one number and one special character.");

      return false;
    }

    if (!this.firstName || !this.lastName || !this.isValidStringInput(this.firstName)
      || !this.isValidStringInput(this.lastName)) {
      this.presentToast("Please enter a valid first and last name.");

      return false;
    }

    if (!this.birthdate) {
      this.presentToast("Please enter your birthdate.");
      return false;
    }

    if (!this.validateFiveDigitUSZipCode(this.zip)) {
      this.presentToast("Please enter a valid 5-digit United States zipcode.");
      return false;
    }

    if (!this.maritalStatus || !this.sex) {
      this.presentToast("Please indicate your marital status and sex.");
      return false;
    }

    console.log("All input fields were validated successfully.");
    return true;
  }

  presentToast(msgToDisplay) {
    const toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }
  //narrow range to US zip codes, as we are not currently accepting country codes
  validateFiveDigitUSZipCode(zipCode) {
    return /^\d{5}$/.test(zipCode);
  }

  isValidStringInput(strToCheck) {
    let validStringFormat = /^[a-zA-Z\s]*$/;
    return validStringFormat.test(strToCheck);
  }

  validateEmailFormat(emailIn) {
    //string@string.string
    let format = /\S+@\S+\.\S+/;
    return format.test(emailIn);
  }

  validatePasswordFormat(passwordIn): boolean {
    let validPwdFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return validPwdFormat.test(passwordIn);
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
