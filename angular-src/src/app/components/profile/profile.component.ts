import { Component, OnInit } from '@angular/core';
import {PinsService} from '../../services/pins.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private pinsService: PinsService, private flashMessage: FlashMessagesService, private router: Router) { }

  ngOnInit() {
  this.pinsService.getProfile().subscribe(res => {
  	this.profile = res;
  });
  }
 onDeleteClick(pin){
 this.pinsService.deletePin(pin).subscribe(res => {
 if(res.success){
  this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
  this.pinsService.getProfile().subscribe(res => {
    this.profile = res;
  });
 } else {
  this.flashMessage.show("Try again", {cssClass: 'alert-danger', timeout: 3000})
 }
 })
 }
pin: any;  
profile: any;
}
