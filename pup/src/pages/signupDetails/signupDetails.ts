import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular'

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

    constructor(public navCtrl: NavController, public navParams : NavParams, private toastCtrl: ToastController) {
        //email and password input validated on the signup page before
        this.email = navParams.get('param1');
        this.password = navParams.get('param2');
    }

    //narrow range to US zip codes, as we are not currently accepting country codes
    validateUSZipCode(zipCode) {
        return /^\d{5}(-\d{4})?$/.test(zipCode);
    }


    //only allow lowercase letters, uppercase letters, and spaces to be accepted as valid input
    //returns true if the input is good
    validateStringInput(strToCheck) {
       let validStringFormat = /^[a-zA-Z\s]*$/; 
        // if(!validStringFormat.test(strToCheck)) {
        //     return false; 
        // } 
        // return true;

        return (!validStringFormat.test(strToCheck)); 
    }

    //proper date format: MM/DD/YY
    //returns true if the date is formatted correctly
    validateDateInput(dateToCheck) {
        let splitDate = dateToCheck.split('/'); 
        var date = new Date(splitDate[2] + '/' + splitDate[0] + '/' + splitDate[1]);
        return (date && (date.getMonth() + 1) == splitDate[0] && date.getDate() == Number(splitDate[1]) && date.getFullYear() == Number(splitDate[2]));
    }

    presentToast(msgToDisplay) {
        let toast = this.toastCtrl.create({
          message: msgToDisplay,
          duration: 2500,
          position: 'middle'
        });
    
        toast.present();
      }


    signupDetails() {
        if(this.validateStringInput(this.firstName) || this.validateStringInput(this.lastName)) {
            let errorMsg = "Acceptable Input Limited to Letters and Spaces"; 
            console.log(errorMsg);
            this.presentToast(errorMsg);

            return; 
        }

        //check that a date has been entered and that it is in the proper format
        if(!this.validateDateInput || !this.validateDateInput(this.birthdate)) {
            let errorMsg = "Proper Date Format: MM/DD/YYYY"; 
            console.log(errorMsg);
            this.presentToast(errorMsg);

            return; 
        }

        if(!this.validateUSZipCode(this.zip)) {
            let errorMsg = "Invalid Zip Code, Must be in USA"; 
            console.log(errorMsg);
            this.presentToast(errorMsg);

            return; 
        }

        if(!this.maritalStatus || !this.userSex) {
            let errorMsg = "Please complete entire form"; 
            console.log(errorMsg);
            this.presentToast(errorMsg);

            return; 
        }

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