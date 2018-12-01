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
  aboutMe: string;
  birthdate: string;
  breed: string;
  energyLevel: string;
  lifeStage: any; 
  names: string;
  numDogs: 1;
  profileImage: any;
  sex: string;
  size: string;
  userProfile: any;
  pupName: string;
  pupBreed: string;

  userId: any; 
  formData: any; 

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
    // if (!this.birthdate || this.validateDateInput(this.birthdate)) {
    //   let errorMsg = "Proper Date Format: MM/DD/YYYY";
    //   console.log(errorMsg);
    //   this.presentToast(errorMsg);

    //   return false;
    // }

    // if (!this.energyLevel || !this.lifeStage || !this.sex) {
    //   let errorMsg = "Please complete entire form";
    //   console.log(errorMsg);
    //   this.presentToast(errorMsg);

    //   return false;
    // }
    return true;
  }

  createDogProfileBtnClick() {
    this.createMatchProfile();
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
  }

  // uploadFile POST 
  // /upload --> Form Data ProfilePic, requestBody ImageUploadRequest -> MatchProfile
  public uploadDogProfilePicFile(headers, headersWithAuthToken, file:Blob, matchProfile, filename) {
    let formData = new FormData();
    formData.append('file', file, filename); //formData.append('file', file, 'test.jpg');

    let uploadDogProfilePicDetails = JSON.stringify({
      formData: this.formData,
      ImageUploadRequest: matchProfile
    });

    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/upload', uploadDogProfilePicDetails, { headers: headersWithAuthToken }) 
  }

  public createMatchProfile() {
    if (this.userInputIsValid()) {
      //get user details from globalvars.ts
      let userProfileData = this.globalVarsProvider.getUserProfileData();
      this.userId = this.globalVarsProvider.getUserId();

      const headers = new Headers({ 'Content-Type': 'application/json' });

      let matchProfileDetails = JSON.stringify({
        aboutMe: this.aboutMe,
        birthdate: "2017-08-31", //this.birthdate format being wonky, TODO: grab value from user
        breed: this.breed,
        energyLevel: "high", //hardcoded value for now
        lifeStage: this.lifeStage,
        names: this.names,
        numDogs: 1,
        profileImage: null,
        sex: this.sex,
        size: this.size,
        userProfile: userProfileData
        // pupName: this.pupName,
        // pupBreed: this.pupBreed,
        // energyLevel: "high", //hardcoded value for now
        // lifeStage: this.lifeStage,
        // sex: this.sex,
        // birthdate: "2017-08-31",//this.birthdate format being wonky, TODO: grab value from user
        // aboutMe: this.aboutMe,
        // pupSize: this.pupSize,
        // numDogs: 1,
        // pupImage: null, //this.globalVarsProvider.getFileToUpload(), grab the image path from the global vars, assuming they went through this process in emulator in Xcode
        // userProfile: userProfileData
        //score and id are not passed but calculated on the backend
      });
      console.log(matchProfileDetails);

      let headersWithAuthToken = this.globalVarsProvider.getHeadersWithAuthToken(); 

      // createMatchProfileForUserByUserProfileId -- POST /user/{userId}/matchProfile
      // this.http.post('http://localhost:5000/matchProfile', matchProfileDetails, { headers: headersWithAuthToken }) //For running back-end in AWS
      this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/user/' + this.userId +'/matchProfile', matchProfileDetails, { headers: headersWithAuthToken }) //For running back-end in AWS
        .subscribe(result => {
          console.log('Response status code: ' + result['status']);
          if (result['status'] == 200) {
            console.log(result);
            let jsonResponseObj = JSON.parse((result['_body'])); 

            //Success! navigate user to the next page
            let matchProfileCreated = "Match Profile Created! Please wait . . .";
            this.presentToast(matchProfileCreated);

            this.uploadDogProfilePicFile(headers, headersWithAuthToken, this.profileImage, matchProfileDetails, this.globalVarsProvider.getFileToUpload());

            this.navCtrl.push(TabsPage, {matchProfileDetails});
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