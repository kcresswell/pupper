import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MatchingPage } from '../matching/matching';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular'
import { DogProfilePicPage } from '../dogProfilePic/dogProfilePic';


@Component({
  selector: 'page-dogProfile',
  templateUrl: 'dogProfile.html'
})
export class DogProfilePage {
  pupName: string;
  pupBreed: string;
  energyLevel: any;
  lifeStage: any;
  pupperSex: any;
  pupperNeutered: any;
  pupBirthdate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private toastCtrl: ToastController) {

  }

  showConfirmAlert() {
    let alertConfirm = this.alertCtrl.create({
      title: 'Pup Profile Created!',
      message: '',
      buttons: [
        {
          text: 'Find Friendogs!',
          handler: () => {
            console.log('Find Friendogs Clicked');
            //pup name, breed, life stage, energy level
            this.navCtrl.push(MatchingPage, {param1: this.pupName, param2: this.pupBreed, param3: this.lifeStage, param4: this.energyLevel, param5: "assets/imgs/indy.jpeg"});
          }
        }
      ]
    });
    alertConfirm.present();
  }

  //only allow lowercase letters, uppercase letters, and spaces to be accepted as valid input
  //returns true if the input is good
  validateStringInput(strToCheck) {
    let validStringFormat = /^[a-zA-Z\s]*$/;
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

  addDogProfilePic() {
    this.navCtrl.push(DogProfilePicPage, {});
  }

  createDogProfileBtnClick() {
    if (this.validateStringInput(this.pupName) || this.validateStringInput(this.pupBreed)) {
      let errorMsg = "Acceptable Input Limited to Letters and Spaces";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    //check that a date has been entered and that it is in the proper format
    if (!this.pupBirthdate || !this.validateDateInput(this.pupBirthdate)) {
      let errorMsg = "Proper Date Format: MM/DD/YYYY";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    if (!this.energyLevel || !this.lifeStage || !this.pupperSex || !this.pupperNeutered) {
      let errorMsg = "Please complete entire form";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return;
    }

    let pupProfileDetails = {
      pupName: this.pupName,
      pupBreed: this.pupBreed,
      energyLevel: this.energyLevel,
      lifeStage: this.lifeStage,
      pupperSex: this.pupperSex,
      pupperNeutered: this.pupperNeutered,
      pupBirthdate: this.pupBirthdate
    };

    console.log(pupProfileDetails);

    //TODO: Send JSON Request With Dog Profile Data
    //TODO: Have Matching Tab Selected Showing Blue When Nav to this page
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");


    this.showConfirmAlert();
    this.navCtrl.push(TabsPage, {});
  }
}