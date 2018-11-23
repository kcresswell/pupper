import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { ToastController } from 'ionic-angular'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  email: string;
  password: string;

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
    console.log('Login page constructor');

  }

  login() {
    console.log('Login button clicked');

    if (this.userInputIsValid()) {
      // let loginData = JSON.stringify({
      //   username: "test@test.com",
      //   password: "password"
      // });

      //Uncomment below for auto filling email/password fields
      // this.username = "test@test.com";
      // this.password = "password";

      // let headers = new HttpHeaders({'Content-Type':'application/json'});
      let headers = new Headers({ 'Content-Type': 'application/json' });

      let loginData = JSON.stringify({
        username: this.email,
        password: this.password
      });

      this.http.post('http://localhost:5000/login', loginData, { headers: headers }) //For running back-end locally
      // this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', loginData, { headers: headers }) //For running back-end in AWS
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

          //TODO: Make a second update call to userProfile table to update lastLogin for userProfile.
          this.navCtrl.push(TabsPage);
          //, {param1: this.email, param2: this.password});
        }
        },
        error => console.log(error)
      );
    }

  }

  retrieveUserProfile(response) {
    let jwtAccessToken = response.headers.get("Authorization");

    console.log(jwtAccessToken);

    let headers = new Headers({'Content-Type':'application/json', 'Authorization': jwtAccessToken});

    console.log(headers);
    // this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user', {headers: headers})
    this.http.get('http://localhost:5000/user?email=' + this.email, {headers: headers})
    .subscribe(resp => {
      if (resp['status'] == 403) {
        this.presentToast("Your session has expired. Please log in again.");
        return;
      }
      else if (resp['status'] == 400 || resp['status'] == 404 || resp['status'] == 422) {
        let errorMsg = "Error loading User Profile data.";
        this.presentToast(errorMsg);
      }
      else if (resp['status'] == 200) {
        //TODO: Write logic to appropriately parse and display user profile data on screen.
        console.log(resp);
        console.log(resp['_body']);
      }
      },
      error => console.log(error)
    );

  }

  userInputIsValid(): boolean {
    if (!this.email || !this.password || !this.validateEmailFormat(this.email)) {
      let errorMsg = "Please enter a valid email and password.";
      // console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }
    return true;
  }

  validateEmailFormat(emailIn): boolean {
    let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegEx.test(emailIn)) {
      // console.log("A valid email was entered.");
    }
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
