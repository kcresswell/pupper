import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-signupDetails',
    templateUrl: 'signupDetails.html'
})
export class SignupDetailsPage {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    zip: string;
    maritalStatus: any;
    userSex: any;

    constructor(public navCtrl: NavController, public navParams : NavParams) {
        //email and password input validated on the signup page before
        this.email = navParams.get('param1');
        this.password = navParams.get('param2');
    }

    signupDetails() {
        let signupInfo = {
            email: this.email, 
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            birthdate: this.birthdate,
            zip: this.zip,
            maritalStatus: this.maritalStatus,
            pupperSex: this.userSex
        }
        console.log(signupInfo);

        //TODO: Send JSON Request with signup info
        console.log("Signup Button Was Pressed on Signup Page");
        this.navCtrl.push(TabsPage, {}, { animate: true });

    }
}