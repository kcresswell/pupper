import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  zip: string;
  maritalStatus: any;
  userSex: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
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

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SignupPage');
  // }

  signup() {
    console.log("Next button clicked");
    //Check if email or password are empty, make sure email is a valid format
    if (!this.email || !this.password || !this.validateEmail(this.email)) {
      let errorMsg = "Please enter a valid email and password.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    if (!this.firstName || !this.lastName) {
      let errorMsg = "Please enter your first and last name.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    if (this.validateStringInput(this.firstName) || this.validateStringInput(this.lastName)) {
      let errorMsg = "Acceptable Input Limited to Letters and Spaces";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    //check that a date has been entered and that it is in the proper format
    if (!this.birthdate || !this.validateDateInput(this.birthdate)) {
      let errorMsg = "Proper Date Format: MM/DD/YYYY";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    if (!this.validateUSZipCode(this.zip)) {
      let errorMsg = "Invalid Zip Code, Must be in USA";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    if (!this.maritalStatus || !this.userSex) {
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
