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
  timestamp: string; //"yyyy-MM-dd’T’HH:mm:ss’Z'"

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    public http: Http, public globalVarsProvider: GlobalvarsProvider) {
      // this.matchProfileReceiver = navParams.get("matchProfileDetails"); 
      // console.log("MATCH PROFILE DETAILS: " + this.matchProfileReceiver); 
      this.matchProfileReceiver = {"aboutMe":"Cute dog.","birthdate":"2017-12-06","breed":{"id":10,"name":"Shiba Inu","altName":"Shiba","size":"SMALL"},
      "energyLevel":"LOW","lifeStage":"YOUNG","names":"Indy","numDogs":1,"profileImage":null,"sex":"MALE","size":"MID",
      "userProfile":{"id":1,"userAccount":{"id":1,"username":"test@test.com","password":"$2a$04$l1TV6PnY3kg0xtQBjQpgYeIbPttgHLotrOKMLPOPvJk4s304vUPIu"},"firstName":"Bob","lastName":"Smith","sex":
      "MALE","birthdate":"1992-04-10","maritalStatus":"SINGLE","zip":"84095","dateJoin":"2018-11-16","lastLogin":"2018-12-05","profileImage":"https://s3.us-east-1.amazonaws.com/pupper-mobile-app/user_1_bob_2018-12-03T03:02:36Z"}} 
    }

  onSendBtnClick() {
    console.log("onSendBtnClick clicked to send message"); 
    console.log("Message: " + this.message);
    this.sendMessageToMatch();

  }

  //sendMessageToMatch --- POST /message --- Query - sendFrom | Query - sendTo | Body - pupperMessage
  sendMessageToMatch() {
    let sendFrom = this.globalVarsProvider.getUserMatchProfileId();
    let sendTo; //matchProfileReceiverId
    let pupperMessageBody = { 
      matchProfileReceiver: this.matchProfileReceiver,
      matchProfileSender: this.globalVarsProvider.getUserMatchProfile(),
      message: this.message, 
      timestamp: this.timestamp
    };

    this.allMessages.push(this.message);

    for (let i = 0; i < this.allMessages.length; i++) {
      this.messageToSend.push({
        message: this.message
      });
  }

    let messageBody =  JSON.stringify({
      sendFrom: sendFrom,
      sendTo: sendTo,
      pupperMessage: pupperMessageBody
    }); 

    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/message', messageBody, { headers: headers })
      .subscribe(response => {
        // console.log(result['_body']);
        console.log('Response status code: ' + response['status']);

        if (response['status'] == 200) {
          let loginSuccess = "Login success. Please wait . . .";
          this.presentToast(loginSuccess);
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