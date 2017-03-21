import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PinsService} from '../../services/pins.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css']
})
export class AddnewComponent implements OnInit {

  constructor(private authService: AuthService, private pinsService: PinsService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }
url: string;
title: string;
author: any;

addNew(){
const authorID = this.authService.getUser();
const author = this.authService.getUsername();
let newPin = {
	url: this.url,
	title: this.title,
	authorID: authorID,
  author: author
}
if(!this.pinsService.validate(newPin)){
  this.flashMessage.show("Please fill all the field", {cssClass: 'alert-danger', timeout: 3000})
  return false;
  }
this.pinsService.newPin(newPin).subscribe(res => {
  if(res.success){
  this.flashMessage.show(res.msg, {cssClass: 'alert-success', timeout: 3000});
	this.router.navigate(['/']);
  }
});
}
}
