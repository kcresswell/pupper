import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  responseData : any;

  constructor(public navCtrl: NavController, public http: Http) {
    console.log('Login page constructor');
  }

    login(){
      console.log('Login button clicked');

      let loginData = {
        "username": "test@test.com",
        "password": "password"
      };

      this.http.post('https://pupper.us-east-1.elasticbeanstalk.com/login', loginData, new HttpHeaders().set('Content-Type', 'application/json'))
      // this.http.post('http://localhost:5000/login', loginData, new HttpHeaders().set('Content-Type', 'application/json'))
        .subscribe(data => {
          console.log('response received');

          console.log(data['_body']);
         }, error => {
          console.log(error);
        });
      //TODO: ONLY DO THIS ACTION IF LOGIN IS SUCCESSFUL
      // this.navCtrl.push(TabsPage, {});

    }

  }
