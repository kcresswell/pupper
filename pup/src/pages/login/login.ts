import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public http: Http) {

    let loginData = {
      "username": "test@test.com",
      "password": "password"
    };

    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    
    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json' );
    // const requestOptions = new RequestOptions({ headers: headers });

    console.log('page loaded');
    return this.http.post('https://pupper.us-east-1.elasticbeanstalk.com/login', loginData, httpHeaders)
      .subscribe(data => {
        // console.log(data['_body']);
        console.log('response received');
       }, error => {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login Page');
  }

  loginResponse() {
    this.navCtrl.push(TabsPage);
  }
    
 }
