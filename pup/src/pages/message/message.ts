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
  }
  // Match profile Id 1 belongs to userProfileId=5, 
  // and matchProfileId 2 belongs to userProfileId=2
  onSendBtnClick() {
    const senderUserProfileId = 5;
    const receiverUserProfileId = 2;
    console.log("onSendBtnClick clicked to send message");
    console.log("Message: " + this.message);
    const senderId = this.globalVarsProvider.getUserId(); //THIS IS UNDEFINED
    this.retrieveMatchProfilesAndSendMessage(senderUserProfileId, receiverUserProfileId);
    this.message = "HELLO MESSAGES WORKING!"; //hitting the endpoint to send a message properly, more configuration to come
  }

  retrieveMatchProfilesAndSendMessage(senderUserProfileId, receiverUserProfileId) {
    const getMatchProfileEndpointUrl = this.globalVarsProvider.getServerBaseUrl() + "/user/" + senderUserProfileId + "/matchProfile";

    console.log("Hitting endpoint to retrieve match profile for a given user id: " + getMatchProfileEndpointUrl);
    this.http.get(getMatchProfileEndpointUrl, { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(response => {

        if (response['status'] == 200) {
          let jsonResponseObj = JSON.parse((response['_body']));
          let matchProfileObj = jsonResponseObj['matchProfiles'][0];
          this.globalVarsProvider.setUserMatchProfile(matchProfileObj);
          this.retrieveMatchProfileReceiver(receiverUserProfileId);
        }
      },
        error => console.log(error)
      );
  }

  retrieveMatchProfileReceiver(receiverUserId) {
    const getMatchProfileEndpointUrl = this.globalVarsProvider.getServerBaseUrl() + "/user/" + receiverUserId + "/matchProfile";
    console.log("Hitting endpoint to retrieve match profile for a given user id: " + getMatchProfileEndpointUrl);
    this.http.get(getMatchProfileEndpointUrl, { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
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

  sendMessageToMatch(matchProfileReceiverObj) {
    //The following fields need to be parsed from their matchProfileObjects
    // Match profile Id 1 belongs to userProfileId=5, 
    // and matchProfileId 2 belongs to userProfileId=2
    this.sendFrom = 1;
    this.sendTo = 2;

    let pupperMessageBody = JSON.stringify({
      matchProfileReceiver: matchProfileReceiverObj,
      matchProfileSender: this.globalVarsProvider.getUserMatchProfile(),
      message: this.message,
      timestamp: null
    });

    const sendMessageUrl = this.globalVarsProvider.getServerBaseUrl() + "/message?sendFrom=" +
      this.sendFrom + "&sendTo=" + this.sendTo;

    this.http.post(sendMessageUrl, pupperMessageBody,
      { headers: this.globalVarsProvider.getHeadersWithAuthToken() })
      .subscribe(response => {
        const jsonResponseObj = JSON.parse((response['_body']));
        if (jsonResponseObj['isSuccess'] == 200) {
          console.log("Message successfully sent.");
        }

      }, error => console.log(error)
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
