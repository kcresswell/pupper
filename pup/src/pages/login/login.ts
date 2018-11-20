import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
// import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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



    login() {
        console.log('Login button clicked');

        let loginDetails = {
            username: this.username, 
            password: this.password
        };

        console.log("USERNAME: " + loginDetails.username); 
        console.log("PASSWORD: " + loginDetails.password);  

        this.navCtrl.push(TabsPage, {});

        // //   console.log('usernameID', this.usernameID);
        // //   console.log('passwordID', this.passwordID);

        // let loginData = {
        //     "username": "test@test.com",
        //     "password": "password"
        // };

        // this.http.post('https://pupper.us-east-1.elasticbeanstalk.com/login', loginData)
        //     //this.http.post('http://localhost:5000/login', loginData, new HttpHeaders().set('Content-Type', 'application/json'))
        //     .subscribe(data => {
        //         console.log('response received');
        //         //TODO: ONLY DO THIS ACTION IF LOGIN IS SUCCESSFUL
        //         this.navCtrl.push(TabsPage, {});
        //         console.log(data['_body']);
        //     }, error => {
        //         console.log(error);
        //     });

    }

}
