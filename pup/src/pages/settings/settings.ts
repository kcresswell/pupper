import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { DogProfilePage } from '../dogProfile/dogProfile';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public app: App) {

  }

logout(){
    console.log("Logout Button Pressed on Settings Page"); 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

createNewDogProfile() {
  console.log("Create New Dog Profile Button Pressed on Settings Page"); 
  this.navCtrl.push(DogProfilePage, {});
}

editCurrentDogProfile(){
  console.log("Edit Current Dog Profile Button Pressed on Settings Page"); 
  this.navCtrl.push(DogProfilePage, {});
}
}