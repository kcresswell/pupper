import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
// import { DogProfilePage } from '../DogProfilePage/DogProfilePage';

@Component({
    selector: 'page-matching',
    templateUrl: 'matching.html'
})
export class MatchingPage {
    pupName: string;
    pupBreed: string;
    energyLevel: any;
    lifeStage: any;
    pupperPic: any;
    pupArray: any = 'Pup Info!';

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
    constructor(private sanitizer: DomSanitizer, public navParams: NavParams) {

        this.pupName = navParams.get('param1');
        this.pupBreed = navParams.get('param2');
        this.lifeStage = navParams.get('param3');
        this.energyLevel = navParams.get('param4');
        this.pupperPic = "assets/imgs/indy.jpeg"; 

        this.pupArray = [this.pupName, this.pupBreed, this.lifeStage, this.energyLevel, this.pupperPic];

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
        //logs like/dislike event for each card
        console.log(event);
    }

}