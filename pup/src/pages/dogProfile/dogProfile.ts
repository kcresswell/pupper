import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-dogProfile',
  templateUrl: 'dogProfile.html'
})
export class DogProfilePage {

  constructor(public navCtrl: NavController) {

  }


  createDogProfileBtnClick(){
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
  }
}

