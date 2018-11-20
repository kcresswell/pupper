import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

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
  firstName: string;
  lastName: string; 
  birthdate: Date; 
  zip: string; 
  email: string; 
  password: string;
  maritalStatus: any; 
  userSex: any; 


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let signupDetails = {
      firstName: this.firstName,
      lastName: this.lastName, 
      birthdate: this.birthdate, 
      zip: this.zip, 
      email: this.email, 
      password: this.password,
      maritalStatus: this.maritalStatus, 
      userSex: this.userSex 
    };
    console.log(signupDetails); 

    //TODO: Send JSON Request with signup info
    console.log("Signup Button Was Pressed on Signup Page");  
    this.navCtrl.push(TabsPage, {}, {animate: false});
  }

}
