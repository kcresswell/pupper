import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchingPage } from '../matching/matching';

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

  constructor(public navCtrl: NavController) {

  }


  createDogProfileBtnClick(){
      let pupProfileDetails = {
        pupName: this.pupName,
        pupBreed: this.pupBreed, 
        energyLevel: this.energyLevel, 
        lifeStage: this.lifeStage, 
        pupperSex: this.pupperSex, 
        pupperNeutered: this.pupperNeutered
      };

      console.log(pupProfileDetails);

    //TODO: Send JSON Request With Dog Profile Data
    //TODO: Have Matching Tab Selected Showing Blue When Nav to this page
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
    this.navCtrl.push(MatchingPage, {});
  }
}

