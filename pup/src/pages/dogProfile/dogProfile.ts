import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchingPage } from '../matching/matching';

@Component({
  selector: 'page-dogProfile',
  templateUrl: 'dogProfile.html'
})
export class DogProfilePage {

  constructor(public navCtrl: NavController) {

  }


  createDogProfileBtnClick(){
    //TODO: Send JSON Request With Dog Profile Data
    //TODO: Have Matching Tab Selected Showing Blue When Nav to this page
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
    this.navCtrl.push(MatchingPage, {});
  }
}

