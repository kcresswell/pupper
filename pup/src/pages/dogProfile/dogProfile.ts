import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular'
import { DogProfilePicPage } from '../dogProfilePic/dogProfilePic';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { internals } from 'rx';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

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
  aboutMe: string;
  pupSize: any;
  pupImage: any;
  numDogs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private toastCtrl: ToastController,
    public globalVarsProvider: GlobalvarsProvider, public http: Http) {
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
    if (!this.pupBirthdate || this.validateDateInput(this.pupBirthdate)) {
      let errorMsg = "Proper Date Format: MM/DD/YYYY";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }

    if (!this.energyLevel || !this.lifeStage || !this.pupperSex || !this.pupperNeutered) {
      let errorMsg = "Please complete entire form";
      console.log(errorMsg);
      this.presentToast(errorMsg);

      return false;
    }
    return true;
  }

  createDogProfileBtnClick() {
    this.createMatchProfileForUserByUserProfileId();
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
  }

  //http request to POST to /matchProfile and not /pupperProfile
  //JSON POST: createMatchProfileForUserByUserProfileId
  public createMatchProfileForUserByUserProfileId() {
    let autoFillFieldsForTesting = true;

    if (this.userInputIsValid()) {
      //get user details from globalvars.ts
      let userProfileData = this.globalVarsProvider.getUserProfileData();
      let userId = this.globalVarsProvider.getUserId();

      const headers = new Headers({ 'Content-Type': 'application/json' });

      if (autoFillFieldsForTesting) {
        let matchProfileDetails = JSON.stringify({
          pupName: "Indy",
          pupBreed: "Shiba",
          energyLevel: "Medium",
          lifeStage: "Young",
          pupperSex: "F",
          pupperNeutered: true,
          pupBirthdate: "2017-08-31",
          aboutMe: "All about Indy",
          pupSize: "Small",
          numDogs: 1,
          pupImage: "assets/imgs/indy.jpeg",
          userProfile: userProfileData
          //score? id? 
        });
      }

      let matchProfileDetails = JSON.stringify({
        pupName: this.pupName,
        pupBreed: this.pupBreed,
        energyLevel: this.energyLevel,
        lifeStage: this.lifeStage,
        pupperSex: this.pupperSex,
        pupperNeutered: this.pupperNeutered,
        pupBirthdate: this.pupBirthdate,
        aboutMe: this.aboutMe,
        pupSize: this.pupSize,
        numDogs: 1,
        pupImage: "assets/imgs/indy.jpeg", //this.globalVarsProvider.getFileToUpload(), grab the image path from the global vars, assuming they went through this process in emulator in Xcode
        userProfile: userProfileData
        //score? id? 
      });
      console.log(matchProfileDetails);

      let headersWithAuthToken = this.globalVarsProvider.getHeadersWithAuthToken(); 

      // this.http.post('http://localhost:5000/matchProfile', matchProfileDetails, { headers: headersWithAuthToken }) //For running back-end in AWS
      this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/matchProfile', matchProfileDetails, { headers: headersWithAuthToken }) //For running back-end in AWS
        .subscribe(result => {
          console.log('Response status code: ' + result['status']);
          if (result['status'] == 200) {
            console.log(result);
            let jsonResponseObj = JSON.parse((result['_body'])); //Parse response body string resp['_body']into JSON object to extract data
            let userAccountObj = jsonResponseObj['userAccounts'][0]; //Pass the userAccount in the response to createUserProfile()

            //Success! navigate user to the next page
            let matchProfileCreated = "Match Profile Created! Please wait . . .";
            this.presentToast(matchProfileCreated);

            this.navCtrl.push(TabsPage, {});
          }
          else if (result['status'] == 400 || result['status'] == 404) {
            //REMOVE THIS LATER
            this.presentToast("There's an error with one of your matchProfile fields, this status code should never happen.");
          }
        },
          error => console.log(error)
        );
    }
  }
}