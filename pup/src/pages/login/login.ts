import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginData = {
    "username": "",
    "password": ""
  };

  responseData : any; 

  constructor(public navCtrl: NavController, public http: Http) {
    // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
    //     this.posts = data.data.children;
    // });

    //https://www.joshmorony.com/using-http-to-fetch-remote-data-from-a-server-in-ionic-2/
    //TODO: See if we can use this format to pass in the URL and get out username and pwd
    this.http.request('https://www.reddit.com/r/gifs/new/.json?limit=10').map(res => res.json()).subscribe(data => {
        this.loginData = data.data.children;
        console.log(this.loginData);
    },
    err => {
        console.log("JSON Request failed, login.ts");
    });
  }



  login(){
    //TODO: JSON Request with login info
    this.navCtrl.push(TabsPage, {});
  }


  //https://www.9lessons.info/2017/06/ionic-angular-php-login-restful-api.html
  //need to figure out what our service is, authService comes from import { AuthService } from '../../providers/auth-service';
  
  // signup(){
  //   this.authService.postData(this.loginData,'signup').then((result) => {
  //    this.responseData = result;
  //    if(this.responseData.loginData){
  //    console.log(this.responseData);
  //    localStorage.setItem('loginData', JSON.stringify(this.responseData));
  //    this.navCtrl.push(TabsPage);
  //    }
  //    else{ console.log("User already exists"); }
  //  }, (err) => {
  //    // Error log
  //  });
  // }

  

}