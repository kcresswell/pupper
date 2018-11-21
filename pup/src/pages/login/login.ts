import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public http: Http) {
    console.log('Login page constructor');

  }

  login(){
    console.log('Login button clicked');

    // let headers = new HttpHeaders({'Content-Type':'application/json'});
    let headers = new Headers({'Content-Type':'application/json'});

    // let headers = new Headers({'Content-Type':'application/json', 'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTQyOTEwNjcwfQ.XQusMM72cqkrGY0oOWGrfbejQxDcDCIGDZoIITtc06xuIXQ59U3CM34IfreVbFlQ8yBdpDYKqH58zUECqbtKHA'});

    // let loginData = JSON.stringify({
    //   username: "test@test.com",
    //   password: "password"
    // });

    if (!this.username || !this.password) {
      console.log("Please enter a valid email and password.");
      return;

      //Uncomment below for auto filling username/password fields
      // this.username = "test@test.com";
      // this.password = "password";
    }

    let loginData = JSON.stringify({
        username: this.username,
        password: this.password
    });

    // console.log(loginData);

    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', loginData, {headers: headers})
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
        console.log("Invalid login credentials.");
      }
      else if (result['status'] == 200) {
        console.log("Login success");
        //TODO: send the user account id to the next page so that you display the right profile
        this.navCtrl.push(TabsPage, {});
      }
    });

  }

}
