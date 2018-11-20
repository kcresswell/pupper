import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'page-signupDetails',
    templateUrl: 'signupDetails.html'
})
export class SignupDetailsPage {
    firstName: string;
    lastName: string;
    birthdate: Date;
    zip: string;
    maritalStatus: any;
    userSex: any;

    constructor(public navCtrl: NavController) {
    }

    signupDetails() {
        let signupInfo = {
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