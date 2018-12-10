import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  allMessages = [];
  messageToSend = [];
  matchProfileReceiver: any;
  matchProfileSender: any;
  message: string;
  timestamp: "2018-12-03T03:02:36Z"; //"yyyy-MM-dd’T’HH:mm:ss’Z'"
  sendFrom: any;
  sendTo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    public http: Http, public globalVarsProvider: GlobalvarsProvider) {
    this.matchProfileReceiver = {
      "aboutMe": "Cute dog.", "birthdate": "2017-12-06", "breed": { "id": 10, "name": "Shiba Inu", "altName": "Shiba", "size": "SMALL" },
      "energyLevel": "LOW", "lifeStage": "YOUNG", "names": "Indy", "numDogs": 1, "profileImage": null, "sex": "MALE", "size": "MID",
      "userProfile": {
        "id": 1, "userAccount": { "id": 1, "username": "test@test.com", "password": "$2a$04$l1TV6PnY3kg0xtQBjQpgYeIbPttgHLotrOKMLPOPvJk4s304vUPIu" }, "firstName": "Bob", "lastName": "Smith", "sex":
          "MALE", "birthdate": "1992-04-10", "maritalStatus": "SINGLE", "zip": "84095", "dateJoin": "2018-11-16", "lastLogin": "2018-12-05", "profileImage": "https://s3.us-east-1.amazonaws.com/pupper-mobile-app/user_1_bob_2018-12-03T03:02:36Z"
      }
    }
  }

  onSendBtnClick() {
    console.log("onSendBtnClick clicked to send message");
    console.log("Message: " + this.message);
    const senderId = this.globalVarsProvider.getUserId();
    this.retrieveMatchProfilesAndSendMessage(2);
    this.message = "HELLO MESSAGES WORKING!";
  }

  retrieveMatchProfilesAndSendMessage(userProfileId) {
  const getMatchProfileEndpointUrl = this.globalVarsProvider.getServerBaseUrl() + "/user/" + userProfileId + "/matchProfile";

  console.log("Hitting endpoint to retrieve match profile for a given user id: " + getMatchProfileEndpointUrl);
  this.http.get(getMatchProfileEndpointUrl, { headers: this.globalVarsProvider.getHeadersWithAuthToken()})
    .subscribe(response => {

        if (response['status'] == 200) {
          let jsonResponseObj = JSON.parse((response['_body']));
                let matchProfileObj = jsonResponseObj['matchProfiles'][0];
                this.globalVarsProvider.setUserMatchProfile(matchProfileObj);
                this.retrieveMatchProfileReceiver(3);
        }
      },
        error => console.log(error)
      );
  }

  retrieveMatchProfileReceiver(receiverUserId) {
    const getMatchProfileEndpointUrl = this.globalVarsProvider.getServerBaseUrl() + "/user/" + receiverUserId + "/matchProfile";
    console.log("Hitting endpoint to retrieve match profile for a given user id: " + getMatchProfileEndpointUrl);
    this.http.get(getMatchProfileEndpointUrl, { headers: this.globalVarsProvider.getHeadersWithAuthToken()})
      .subscribe(response => {

          if (response['status'] == 200) {
            let jsonResponseObj = JSON.parse((response['_body']));
                  let matchProfileObj = jsonResponseObj['matchProfiles'][0];

                  this.sendMessageToMatch(matchProfileObj);

          }
        },
          error => console.log(error)
        );
  }

  //sendMessageToMatch --- POST /message --- Query - sendFrom | Query - sendTo | Body - pupperMessage
  sendMessageToMatch(matchProfileReceiverObj) {
    // this.sendFrom = this.globalVarsProvider.getUserMatchProfile()['id'];
    // if(this.sendFrom == Object){
    //   let errorMsg = "Please create a profile for your pupper before matching. This can be added on the Settings tab.";
    //   this.presentToast(errorMsg);
    // }

    this.sendFrom = 2;
    console.log("SendFrom: " + this.sendFrom);

    console.log("matchProfileSender object: " + this.globalVarsProvider.getUserMatchProfile());
    this.sendTo = 3; //userProfileId
    let pupperMessageBody = JSON.stringify({
      matchProfileReceiver: matchProfileReceiverObj,
      matchProfileSender: this.globalVarsProvider.getUserMatchProfile(),
      message: this.message,
      timestamp: null
    });

    //for displaying the message to the screen - move to 200 code block when it is working
    this.allMessages.push(this.message);
    for (let i = 0; i < this.allMessages.length; i++) {
      this.messageToSend.push({
        message: this.message
      });
    }
    //
    // let messageBody = JSON.stringify({
    //   sendFrom: this.sendFrom,
    //   sendTo: this.sendTo,
    //   pupperMessage: pupperMessageBody
    // });

    console.log("Message Body: " + pupperMessageBody);
    // [Log] Message Body: {"sendTo":1,"pupperMessage":{"matchProfileReceiver":{"aboutMe":"Cute dog.","birthdate":"2017-12-06",
    // "breed":{"id":10,"name":"Shiba Inu","altName":"Shiba","size":"SMALL"},"energyLevel":"LOW","lifeStage":"YOUNG",
    // "names":"Indy","numDogs":1,"profileImage":null,"sex":"MALE","size":"MID","userProfile":{"id":1,"userAccount":
    // {"id":1,"username":"test@test.com","password":"$2a$04$l1TV6PnY3kg0xtQBjQpgYeIbPttgHLotrOKMLPOPvJk4s304vUPIu"},
    // "firstName":"Bob","lastName":"Smith","sex":"MALE","birthdate":"1992-04-10","maritalStatus":"SINGLE","zip":"84095",
    // "dateJoin":"2018-11-16","lastLogin":"2018-12-05","profileImage":"https://s3.us-east-1.amazonaws.com/pupper-mobile-app/user_1_bob_2018-12-03T03:02:36Z"}}
    // ,"message":"Hello"}} (main.js, line 441)

    // const headers = new Headers({ 'Content-Type': 'application/json' });
    const sendMessageUrl = this.globalVarsProvider.getServerBaseUrl() + "/message?sendFrom=" + this.sendFrom + "&sendTo=" + this.sendTo;
    console.log("Sending message endpoint: " + sendMessageUrl);
    this.http.post(sendMessageUrl, pupperMessageBody,
    { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(response => {
        console.log(response['_body']);
        console.log('Response status code: ' + response['status']);

        if (response['status'] == 200) {
          //message sent
        }
        else if (response['status'] == 403) {
          //TODO: add a popup here for session expiration, button goes back to login page
        }
        else {
          let errorMsg = "Something went wrong trying to send the message, please try again.";
          this.presentToast(errorMsg);
        }
      },
        error => console.log(error)
      );
  }

  presentToast(msgToDisplay) {
    let toast = this.toastCtrl.create({
      message: msgToDisplay,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}
