import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupDetailsPage } from '../signupDetails/signupDetails';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(){
    let signupDetails = {
      email: this.email, 
      password: this.password
    };
    console.log(signupDetails.email, signupDetails.password); 

    //TODO: Send JSON Request with signup info
    console.log("Signup Button Was Pressed on Signup Page");  
    this.navCtrl.push(SignupDetailsPage, {}, {animate: true});
  }

}
