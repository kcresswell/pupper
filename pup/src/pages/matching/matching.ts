import { Component, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'page-matching',
  templateUrl: 'matching.html'
})
export class MatchingPage {
  
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

images=["assets/imgs/indy.jpeg", "assets/imgs/boston.jpeg"]
  constructor(private sanitizer: DomSanitizer) {

      for (let i = 0; i < this.images.length; i++) {
          this.attendants.push({
              id: i + 1,
              likeEvent: new EventEmitter(),
              destroyEvent: new EventEmitter(),
              asBg: sanitizer.bypassSecurityTrustStyle('url('+this.images[i]+')')
          });
      }

      this.ready = true;
  }

  onCardInteract(event) {
    console.log(event);
  }

  
}
