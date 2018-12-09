import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';
import { MessagingPage } from '../messaging/messaging';
import { MessagePage } from '../message/message';
// import { DogProfilePage } from '../DogProfilePage/DogProfilePage';

@Component({
    selector: 'page-matching',
    templateUrl: 'matching.html'
})
export class MatchingPage {
    aboutMe: string;
    ageWithUnits: string;
    breedName: string;
    distance: string;
    lastActive: string;
    location: string;
    name: string;
    profileId: any;
    profileImage: string;
    sex: string;
    matchProfileDetails: any;
    profileCard: any;

    ready = false;
    attendants = [];
    cardDirection = "xy";
    cardOverlay: any = {
        like: {
            backgroundColor: '#28e93b'
        },
        dislike: {
            backgroundColor: '#e92828'
        }
    };

   
    constructor(private sanitizer: DomSanitizer, public navParams: NavParams, public alertCtrl: AlertController,
        public navCtrl: NavController) {
            this.grabCards();
    }

    grabCards() {
        let images = ["assets/imgs/indy.jpeg", "assets/imgs/jax.jpg", "assets/imgs/boston.jpeg"]
        let pupInfo = [new Array("Indy", " Shiba Inu", " Female"), new Array("Jax", " Pomeranian", " Male"), new Array("Boston", " Shiba Inu", " Male") ];
    
        for (let i = 0; i < images.length; i++) {
            this.profileCard = pupInfo[0];
            this.attendants.push({
                id: i + 1,
                likeEvent: new EventEmitter(),
                destroyEvent: new EventEmitter(),
                asBg: this.sanitizer.bypassSecurityTrustStyle('url(' + images[i] + ')')
            });
        }
        this.ready = true;
    }

    onCardInteract(event) {
        if (event.like) {
            this.popupSendAMessageQuestion();
        }
        console.log(event);
    }

    popupSendAMessageQuestion() {
        let alertConfirm = this.alertCtrl.create({
            title: 'It\'s a match!',
            message: 'Would you like to send this pup a message?',
            buttons: [
                {
                    text: 'Continue',
                    handler: () => {
                        console.log('Continue Clicked');
                    }
                },
                {
                    text: 'Let\'s Chat!',
                    handler: () => {
                        console.log('Lets Chat Clicked');
                        console.log("Match profile details from matching page " + this.matchProfileDetails);
                        this.navCtrl.push(MessagePage, { matchProfileDetails: this.matchProfileDetails });
                    }
                }
            ]
        });
        alertConfirm.present();
    }


}