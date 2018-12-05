import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {

  allMessages: any;
  matchProfileReceiver: any;
  matchProfileSender: any; 
  message: string;
  timestamp: string; //"yyyy-MM-dd’T’HH:mm:ss’Z'"

  constructor(public navCtrl: NavController, private toastCtrl: ToastController,
    public http: Http, public globalVarsProvider: GlobalvarsProvider) {}

  onSendBtnClick() {
    console.log("onSendBtnClick clicked to send message"); 
    console.log("Message: " + this.message);
  }

  //sendMessageToMatch --- POST /message --- Query - sendFrom | Query - sendTo | Body - pupperMessage
  sendMessageToMatch() {
    let sendFrom, sendTo; //TODO: these are strings required in the post, not sure what is expected to be passed
    let pupperMessageBody = JSON.stringify({
      matchProfileReceiver: this.matchProfileReceiver, //TODO: grab this actual value somehow
      matchProfileSender: this.globalVarsProvider.getUserMatchProfile(),
      message: this.message, 
      timestamp: this.timestamp
    });

    const headers = new Headers({ 'Content-Type': 'application/json' });
    this.http.post('http://pupper.us-east-1.elasticbeanstalk.com/message', pupperMessageBody, { headers: headers })
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