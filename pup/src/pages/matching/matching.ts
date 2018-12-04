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

    images = ["assets/imgs/indy.jpeg", "assets/imgs/jax.jpeg", "assets/imgs/boston.jpeg"]

    constructor(private sanitizer: DomSanitizer, public navParams: NavParams, public alertCtrl: AlertController,
        public navCtrl: NavController) {

        // pupName, pupBreed, energyLevel, lifeStage, sex, neutered, birthdate, about me, pupsize, numDogs, image
        // this.matchProfileDetails = navParams.get('matchProfileDetails');
        // this.name = this.matchProfileDetails[0]; 
        // this.breedName = this.matchProfileDetails[1]; 
        // this.sex = this.matchProfileDetails[4]; 
        // let birthdate = this.matchProfileDetails[6]; 
        // this.lastActive = null; //TODO: figure out how to calculate this

        //hardcode values for now
        this.name = "Indy";
        this.breedName = "Shiba Inu";
        this.ageWithUnits = "Young";
        // this.profileImage = "assets/imgs/indy.jpeg";

        this.profileCard = [this.name, this.breedName, this.ageWithUnits, this.profileImage];

        for (let i = 0; i < this.images.length; i++) {
            this.attendants.push({
                id: i + 1,
                likeEvent: new EventEmitter(),
                destroyEvent: new EventEmitter(),
                asBg: sanitizer.bypassSecurityTrustStyle('url(' + this.images[i] + ')')
            });
        }

        this.ready = true;
    }

    onCardInteract(event) {
        if(event.like) {
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
                        this.navCtrl.push(MessagePage, {});
                    }
                }
            ]
        });
        alertConfirm.present();
    }


}