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
    this.createMatchProfileForUserByUserProfileId();
    this.navCtrl.push(TabsPage, {});
    console.log("Create Dog Profile Button Clicked on Dog Profile Page");
  }

  // 	But I’m saying when you click the button create the dog profile, hit the endpoint url to 
  //  create a new match profile not pupper profile . And On my end for now I’ll automatically 
  //  create a match profile and pupper profile. 
  // 	Make the http request to POST to /matchProfile and not /pupperProfile. That’s all 
  //  So I’m just making one post to matchprofile in the dogProfile.ts file for now

  //JSON POST: createMatchProfileForUserByUserProfileId
  public createMatchProfileForUserByUserProfileId() {
    if (this.userInputIsValid()) {
      const headers = new Headers({ 'Content-Type': 'application/json' });

      //TODO: get the user id -- integer (int64)
      let userId = this.globalVarsProvider.getUserId();

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
        pupImage: this.pupImage
        //score? id? 
      });
      console.log(matchProfileDetails);
      let userProfileData = this.globalVarsProvider.getUserProfileData();

      // this.http.post('http://localhost:5000/matchProfile', signupData, { headers: headers }) //For running back-end in AWS
      this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/matchProfile', matchProfileDetails, { headers: headers }) //For running back-end in AWS
        .subscribe(result => {
          // // console.log(result['_body']);
          // console.log('Response status code: ' + result['status']);

          // if (result['status'] == 409) {

          //   this.presentToast("A user account with your selected username already exists. Please login as an existing user or create a profile with a unique username.");
          //   return;
          // }
          // else if (result['status'] == 200) {
          //   console.log("User account created successfully.");

          //   let jsonResponseObj = JSON.parse((result['_body'])); //Parse response body string resp['_body']into JSON object to extract data
          //   let userAccountObj = jsonResponseObj['userAccounts'][0]; //Pass the userAccount in the response to createUserProfile()

          //   //TODO: Verify that this is getting the right id
          //   let userId = userAccountObj['id'];
          //   this.globalVarsProvider.setUserId(userId);

          //   this.userLogin(signupData, userAccountObj);
          // }
        },
          error => console.log(error)
        );
    }

  }
}




  //TODO: Modify to return userProfile for above function
  // retrieveUserProfileForLastLoginUpdate(authHeaders) {
  //   this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user', {headers: authHeaders})
  //   this.http.get('http://pupper.us-east-1.elasticbeanstalk.com/user?email=' + this.email, {headers: authHeaders})
  //   // this.http.get('http://localhost:5000/user?email=' + this.email, {headers: authHeaders})
  //   .subscribe(resp => {
  //     if (resp['status'] == 403) {
  //       this.presentToast("Your session has expired. Please log in again.");
  //       return;
  //     }
  //     else if (resp['status'] == 400 || resp['status'] == 404 || resp['status'] == 422) {
  //       let errorMsg = "Error loading User Profile data.";
  //       this.presentToast(errorMsg);
  //       return;
  //     }
  //     else if (resp['status'] == 200) {
  //       console.log("response body: " + resp['_body']);

  //       let jsonResponseObj = JSON.parse((resp['_body'])); //Parse response body string resp['_body']into JSON object to extract data
  //       let userProfileData = jsonResponseObj['userProfiles'][0]; //User profile data is contained in 'userProfiles' as arraylist

  //       let userId = userProfileData['id']; 
  //       this.globalVarsProvider.setUserId(userId); 

  //       this.updateLastLoginTimestampForUserProfile(userProfileData, authHeaders);

  //       //Navigate to the next page after updating the lastLogin for the user
  //       this.navCtrl.push(TabsPage, userProfileData); //Pass userProfile object to next page using NavController.push()
  //     }
  //   },
  //   error => console.log(error)
  // );

  // }
