import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { min } from 'rxjs/operator/min';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/**
* Generated class for the SignupPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

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
  birthdate: Date;
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
    // if(!validStringFormat.test(strToCheck)) {
    //     return false;
    // }
    // return true;

    return (!validStringFormat.test(strToCheck));
  }

  //proper date format: MM/DD/YY
  //returns true if the date is formatted correctly
  validateDateInput(dateToCheck) {
    let splitDate = dateToCheck.split('/');
    var date = new Date(splitDate[2] + '/' + splitDate[0] + '/' + splitDate[1]);
    return (date && (date.getMonth() + 1) == splitDate[0] && date.getDate() == Number(splitDate[1]) && date.getFullYear() == Number(splitDate[2]));
  }

  validateEmail(emailIn) {
    //string@string.string
    let format = /\S+@\S+\.\S+/;
    return format.test(emailIn);
  }

  presentToast(msgToDisplay) {
    let toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
  }
  //expected format: yyyy-MM-dd
  formatBirthday(date) {
    let splitDate = date.split("/");
    let month = splitDate[0];
    let day = splitDate[1];
    let year = splitDate[2];

    return year + "-" + month + "-" + day;
  }

  //expected format: yyyy-MM-dd HH:mm a
  getLastLogin() {
    let dt = new Date();
    let d = dt.toLocaleDateString();
    let t = dt.toLocaleTimeString();
    t = t.replace(/\u200E/g, '');
    t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
    let dDash = d.split("/");
    let month = dDash[0];
    let day = dDash[1];
    let year = dDash[2];
    return year + "-" + month + "-" + day + " " + t;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    console.log("Signup button clicked");
    this.createUserAccountAndProfile();
  }

  createUserAccountAndProfile() {
    let autoFillFieldsForTesting = false;

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

    this.http.post('http://localhost:5000/account/register', signupData, { headers: headers }) //For running back-end in AWS
    // this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/account/register', signupData, { headers: headers }) //For running back-end in AWS
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

        this.userLogin(signupData, userAccountObj);
      }
    },
    error => console.log(error)
  );
}

userLogin(userCredentials, userAccountObj) {
  const headers = new Headers({ 'Content-Type': 'application/json' });

  this.http.post('http://localhost:5000/login', userCredentials, { headers: headers })
  // this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', userCredentials, { headers: headers }) //For running back-end in AWS
  .subscribe(response => {
    if (response['status'] == 403) {
      this.presentToast("Invalid login credentials.");
    }
    else if (response['status'] == 200) {
      console.log("login success.");
      const jwtAccessToken = response.headers.get("Authorization");
      const headersWithAuth = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwtAccessToken });

      this.createUserProfile(userAccountObj, headersWithAuth);
    }
  },
  error => console.log(error)
);

}

createUserProfile(userAccountObj, headersWithAuthToken) {
  //---------createUserProfile--------
  // [Log] {"username":"hello@gmail.com","password":"hi","firstName":"Kayla",
  // "lastName":"Butt","birthdate":"1995-08-30","zip":"84095",
  // "maritalStatus":"married","dateJoin":"2018-11-25",
  // "lastLogin":"2018-11-25 10:25 AM","userAccount":["hello@gmail.com","hi"]} (main.js, line 223)
  let dateJoinFormatted = new Date().toISOString().slice(0, 10);
  let birthdateFormatted = this.formatBirthday(this.birthdate);

  let autoFill = false;

  if (autoFill) {
    let userProfileData = JSON.stringify({
      firstName: "testFirst",
      lastName: "testLast",
      birthdate: "2000-05-05",
      zip: "84095",
      maritalStatus: "Single",
      sex: "F",
      dateJoin: "2018-11-25", //yyyy-MM-dd
      lastLogin: "2018-11-25 11:03 PM",//yyyy-MM-dd HH:mm a
      userAccount: userAccountObj
    });
  }

  let userProfileData = JSON.stringify({
    username: this.email,
    password: this.password,
    firstName: this.firstName,
    lastName: this.lastName,
    birthdate: birthdateFormatted,
    zip: this.zip,
    maritalStatus: this.maritalStatus,
    sex: this.sex,
    dateJoin: dateJoinFormatted, //yyyy-MM-dd
    lastLogin: this.getLastLogin(),//yyyy-MM-dd HH:mm a
    userAccount: [this.email, this.password]
  });

  console.log(userProfileData);

  this.http.post('http://localhost:5000/user', userProfileData, { headers: headersWithAuthToken }) //For running back-end in AWS
  // this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/user', userProfileData, { headers: headersWithAuthToken }) //For running back-end in AWS
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

//TODO: Move these back up over the signupData when the JSON stuff is working
//Check if email or password are empty, make sure email is a valid format
// if (!this.email || !this.password || !this.validateEmail(this.email)) {
//   let errorMsg = "Please enter a valid email and password.";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }

// if (!this.firstName || !this.lastName) {
//   let errorMsg = "Please enter your first and last name.";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }

// if (this.validateStringInput(this.firstName) || this.validateStringInput(this.lastName)) {
//   let errorMsg = "Acceptable Input Limited to Letters and Spaces";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }

// //check that a date has been entered and that it is in the proper format
// if (!this.birthdate || !this.validateDateInput(this.birthdate)) {
//   let errorMsg = "Proper Date Format: MM/DD/YYYY";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }

// if (!this.validateUSZipCode(this.zip)) {
//   let errorMsg = "Invalid Zip Code, Must be in USA";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }

// if (!this.maritalStatus || !this.userSex) {
//   let errorMsg = "Please complete entire form";
//   console.log(errorMsg);
//   this.presentToast(errorMsg);

//   return;
// }