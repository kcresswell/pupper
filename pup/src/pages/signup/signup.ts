import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupDetailsPage } from '../signupDetails/signupDetails';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
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

  next() {
    console.log("Next button clicked"); 
    //Check if email or password are empty, make sure email is a valid format
    if (!this.email || !this.password || !this.validateEmail(this.email)) {
      let errorMsg = "Please enter a valid email and password.";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    let signupDetails = {
      email: this.email,
      password: this.password
    };

    console.log(signupDetails.email, signupDetails.password);

    //TODO: Send JSON Request with signup info
    console.log("Next Button was pressed on initial signup page");
    this.navCtrl.push(SignupDetailsPage, { param1: this.email, param2: this.password }, { animate: true });
  }

}
