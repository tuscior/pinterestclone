import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {PinsService} from '../../services/pins.service';
import {AuthService} from '../../services/auth.service';
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';
import {FlashMessagesService} from 'angular2-flash-messages';
declare var imagesLoaded: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private pinsService: PinsService, private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  this.pinsService.getPins().subscribe(pins => {
    this.pins = pins;
    if(this.pins[1]){
    this.authService.storageData(this.pins[1]);
    }
  });
  } 
handleImage(url){
    url = "http://mdmobile.pl/wp-content/uploads/2014/09/default-no-image.png"
}
onVoteClick(pin){
  let user = this.authService.getUser();
    if(this.pinsService.alreadyVoted(pin,user)){
      this.flashMessage.show('Already voted', {cssClass: 'alert-success', timeout: 3000});
      return false;
  }
  this.pinsService.addVote(pin, user).subscribe(data => {
    this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
    this.pinsService.getPins().subscribe(pins => {
    this.pins = pins;
    });
    
  });
}


pins: any;
}
