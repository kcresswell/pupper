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

  login() {
    console.log('Login button clicked');

    // let headers = new HttpHeaders({'Content-Type':'application/json'});
    let headers = new Headers({ 'Content-Type': 'application/json' });

    // let headers = new Headers({'Content-Type':'application/json', 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTQyOTEwNjcwfQ.XQusMM72cqkrGY0oOWGrfbejQxDcDCIGDZoIITtc06xuIXQ59U3CM34IfreVbFlQ8yBdpDYKqH58zUECqbtKHA'});

    // let loginData = JSON.stringify({
    //   email: "test@test.com",
    //   password: "password"
    // });

    //Check if email or password are empty, make sure email is a valid format
    if (!this.email || !this.password || !this.validateEmail(this.email)) {
      let errorMsg = "Please enter a valid email and password.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;

      //Uncomment below for auto filling email/password fields
      // this.email = "test@test.com";
      // this.password = "password";
    }

    let loginData = JSON.stringify({
      email: this.email,
      password: this.password
    });

    // console.log(loginData);

    //send post request to login
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', loginData, { headers: headers })
      // this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user', {headers: headers})
      .subscribe(result => {
        console.log('response received');
        console.log(result);
        // console.log(result['_body']);
        console.log('Response status code: ' + result['status']);
        let responseHeaders = result.headers;
        console.log(responseHeaders);
        // console.log(responseHeaders['Authorization']);

        if (result['status'] == 403) {
          //invalid credentials
          let errorMsg = "Invalid login credentials, please try again.";
          console.log(errorMsg);
          this.presentToast(errorMsg);
        }
        else if (result['status'] == 200) {
          //success! navigate user to the next page
          console.log("Login success");
          //TODO: send the user account id to the next page so that you display the right profile
          //TODO: another call to get the user profile from the user account
          this.navCtrl.push(TabsPage); 
          //, {param1: this.email, param2: this.password});
        }
      });

  }

}
