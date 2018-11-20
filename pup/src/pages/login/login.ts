import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
  responseData: any;
  username: string;
  password: string;
  responseData : any;

  constructor(public navCtrl: NavController, public http: Http) {
    console.log('Login page constructor');

  }



  login(){
    console.log('Login button clicked');

    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //    let headers = new HttpHeaders({'Content-Type':'application/json' ,
    //   'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNTQyNzUxOTQ5fQ.I5trsD_WZDMXEiaXELNjuQA9LaYwzCx9xuLGWb9a8BULSa3R7KLulliZ54-d8jGsJFi1gddOpYgs0hgkJ8S9jA'});
    console.log(headers.get('Content-Type'));

    // let loginData = JSON.stringify({
    //   username: "test@test.com",
    //   password: "password"
    // });

    let loginDetails = {
        username: this.username,
        password: this.password
    };

    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/login', loginData, headers)
    .subscribe(result => {
      console.log('response received');
      console.log(result);
      // console.log(result['_body']);
      console.log('Response status code: ' + result['status']);
      let responseHeaders = result.headers;
      console.log(responseHeaders);
      // console.log(responseHeaders['Authorization']);


      if (result['status'] == "200") {
        //TODO: send the user account id to the next page so that you display the right profile
        this.navCtrl.push(TabsPage, {});
      }
    });

  }

}
