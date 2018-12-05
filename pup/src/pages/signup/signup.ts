import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { min } from 'rxjs/operator/min';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private toastCtrl: ToastController, public globalVarsProvider: GlobalvarsProvider) {

  }

  //narrow range to US zip codes, as we are not currently accepting country codes
  validateUSZipCode(zipCode) {
    return /^\d{5}(-\d{4})?$/.test(zipCode);
  }


  //only allow lowercase letters, uppercase letters, and spaces to be accepted as valid input
  //returns true if the input is good
  validateStringInput(strToCheck) {
    let validStringFormat = /^[a-zA-Z\s]*$/;
    return (!validStringFormat.test(strToCheck));
  }

  validateEmail(emailIn) {
    //string@string.string
    let format = /\S+@\S+\.\S+/;
    return format.test(emailIn);
  }

  //valid password will have 7 - 15 characters and contain at least one number and special character
  validatePasswordFormat(passwordIn): boolean {
    let validPwdFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return validPwdFormat.test(passwordIn);
  }

  presentToast(msgToDisplay) {
    let toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }

  userInputIsValid() {
    // Check if email is empty, make sure email is a valid format
    if (!this.email || !this.validateEmail(this.email)) {
      let errorMsg = "Please enter a valid email";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    //check if password is empty, make sure password is a valid format
    if (!this.validatePasswordFormat(this.password) || !this.password) {
      let errorMsg = "Please enter a valid password, with 7 - 15 characters, a digit, and a special character.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    if (!this.firstName || !this.lastName) {
      let errorMsg = "Please enter your first and last name.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    if (this.validateStringInput(this.firstName) || this.validateStringInput(this.lastName)) {
      let errorMsg = "Acceptable Input Limited to Letters and Spaces";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    //check that a date has been entered and that it is in the proper format
    // if (!this.birthdate) {
    //   let errorMsg = "Please enter your birthdate.";
    //   console.log(errorMsg);
    //   this.presentToast(errorMsg);

    //   return false;
    // }

    if (!this.validateUSZipCode(this.zip)) {
      let errorMsg = "Invalid Zip Code, Must be in USA";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    if (!this.maritalStatus || !this.sex) {
      let errorMsg = "Please complete entire form";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }
    return true;
  }

  signup() {
    console.log("Signup button clicked");
    this.createUserAccountAndProfile();
  }

  createUserAccountAndProfile() {
    let autoFillFieldsForTesting = false;
    if (this.userInputIsValid()) {
    
    const headers = new Headers({ 'Content-Type': 'application/json' });

    if (autoFillFieldsForTesting) {
      let signupData = JSON.stringify({
        username: "fml@jaxel.com",
        password: "password"
      });
    }

    let signupData = JSON.stringify({
      username: this.email,
      password: this.password
    });
    console.log(signupData);

    // this.http.post('http://localhost:5000/account/register', signupData, { headers: headers }) //For running back-end in AWS
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/account/register', signupData, { headers: headers }) //For running back-end in AWS
      .subscribe(result => {
        // console.log(result['_body']);
        console.log('Response status code: ' + result['status']);

        if (result['status'] == 409) {

          this.presentToast("A user account with your selected username already exists. Please login as an existing user or create a profile with a unique username.");
          return;
        }
        else if (result['status'] == 200) {
          console.log("User account created successfully.");

          let jsonResponseObj = JSON.parse((result['_body'])); //Parse response body string resp['_body']into JSON object to extract data
          let userAccountObj = jsonResponseObj['userAccounts'][0]; //Pass the userAccount in the response to createUserProfile()

          //TODO: Verify that this is getting the right id
          let userId = userAccountObj['id']; 
          this.globalVarsProvider.setUserId(userId); 

          this.userLogin(signupData, userAccountObj);
        }
      },
        error => console.log(error)
      );
    }
  }

  userLogin(userCredentials, userAccountObj) {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    // this.http.post('http://localhost:5000/login', userCredentials, { headers: headers })
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', userCredentials, { headers: headers }) //For running back-end in AWS
      .subscribe(response => {
        if (response['status'] == 403) {
          this.presentToast("Invalid login credentials.");
        }
        else if (response['status'] == 200) {
          console.log("login success.");
          const jwtAccessToken = response.headers.get("Authorization");
          const headersWithAuth = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwtAccessToken });

          this.createUserProfile(userAccountObj, headersWithAuth);

          //set global variable for authHeaders upon login
          this.globalVarsProvider.setHeadersWithAuthToken(headersWithAuth); 
        }
      },
        error => console.log(error)
      );

  }

  createUserProfile(userAccountObj, headersWithAuthToken) {
    if (this.userInputIsValid()) {
    let dateJoinFormatted = new Date().toISOString().slice(0, 10);

    let autoFill = true;

    if (autoFill) {
      let userProfileData = JSON.stringify({
        firstName: "testFirst",
        lastName: "testLast",
        birthdate: "2000-05-05",
        zip: "84095",
        maritalStatus: "Single",
        sex: "F",
        dateJoin: "2018-11-25", //yyyy-MM-dd
        lastLogin: "2018-11-25",//yyyy-MM-dd
        userAccount: userAccountObj
      });
    }
    //checks go here, one big if - everything but uname and pwd
    let userProfileData = JSON.stringify({
      firstName: this.firstName,
      lastName: this.lastName,
      birthdate: "2000-05-05", //this.birthdate,
      zip: this.zip,
      maritalStatus: this.maritalStatus,
      sex: this.sex,
      dateJoin: dateJoinFormatted,
      lastLogin: dateJoinFormatted,
      userAccount: userAccountObj
    });

    console.log(userProfileData);

    // this.http.post('http://localhost:5000/user', userProfileData, { headers: headersWithAuthToken }) //For running back-end in AWS
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/user', userProfileData, { headers: headersWithAuthToken }) //For running back-end in AWS
      .subscribe(result => {
        if (result['status'] == 200) {
          console.log(result);
          //Success! navigate user to the next page
          let signupSuccess = "User Profile Created! Please wait . . .";
          this.presentToast(signupSuccess);

          this.navCtrl.push(TabsPage, {}, { animate: true });
        }
        else if (result['status'] == 400 || result['status'] == 404) {
          //REMOVE THIS LATER
          this.presentToast("There's an error with one of your userProfile fields, this status code should never happen.");
        }
      },
        error => console.log(error)
      );
    }
  }

  
}