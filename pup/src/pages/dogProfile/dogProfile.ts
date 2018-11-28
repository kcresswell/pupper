import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  matchProfileId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private toastCtrl: ToastController) {

  }

  //createPupperProfileByUserProfileIdAndMatchProfileId POST'
  //POST /user/{userId}/matchProfile/{matchProfileId}/pupper
  //get the user id 
  //{matchProfileId}, not sure where this needs to come from
  //define pupper profile
  // --> contains match profile
  // ------> contains user profile
  public createPupperProfileByUserProfileIdAndMatchProfileId() {
    if (this.userInputIsValid()) {
      let pupProfileDetails = {
        pupName: this.pupName,
        pupBreed: this.pupBreed,
        energyLevel: this.energyLevel,
        lifeStage: this.lifeStage,
        pupperSex: this.pupperSex,
        pupperNeutered: this.pupperNeutered,
        pupBirthdate: this.pupBirthdate
      };

      //TODO: get the user id -- integer (int64)

      //TODO: get the matchProfileId -- integer (int64)

      //TODO: define pupper profile
          //pupperProfile: birthdate (string), 
          //breed, [altName, id, name, size enum]
          //energy (enum (MIN, LOW, MED, HIGH, EXTREME)), 
          //fixed (boolean), id (integer (int64)), lifeStage (enum (PUPPY, YOUNG, ADULT, MATURE)),
          
          // matchProfile
          // [aboutMe, birthdate, breed, energyLevel, id, lifeStage enum, names, numDogs, 
          // profileImage, score, sex, size, userProfile]
          
          //name (string), sex (string)

      //TODO: get match profile

      //TODO: get user profile

      console.log(pupProfileDetails);
      console.log("Create Dog Profile Button Clicked on Dog Profile Page");
    }
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

  userInputIsValid() {
    if (this.validateStringInput(this.pupName) || this.validateStringInput(this.pupBreed)) {
      let errorMsg = "Acceptable Input Limited to Letters and Spaces";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    //check that a date has been entered and that it is in the proper format
    // if (!this.pupBirthdate || this.validateDateInput(this.pupBirthdate)) {
    //   let errorMsg = "Proper Date Format: MM/DD/YYYY";
    //   console.log(errorMsg);
    //   this.presentToast(errorMsg);

    //   return;
    // }

    if (!this.energyLevel || !this.lifeStage || !this.pupperSex || !this.pupperNeutered) {
      let errorMsg = "Please complete entire form";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }
    return true;
  }

  createDogProfileBtnClick() {
    this.createPupperProfileByUserProfileIdAndMatchProfileId();
    this.navCtrl.push(TabsPage, {});
  }
}