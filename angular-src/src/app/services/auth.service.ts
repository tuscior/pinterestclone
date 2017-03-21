import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
@Injectable()
export class AuthService {

  constructor(private http: Http) { }


logout(){
	localStorage.setItem('user', null);
	localStorage.setItem('id_token', null);
	localStorage.clear();
	return this.http.get('logout').map(res => res.json())
}
isLogged(){
	let user = localStorage.getItem('user');
	if(user) return true;
	else {
		return false;
	}
}
getUser(){
	let userStr = localStorage.getItem('user');
	let profile = JSON.parse(userStr);
	if(profile){
		return profile._id;
	}
}
getUsername(){
	let userStr = localStorage.getItem('user');
	let profile = JSON.parse(userStr);
	if(profile){
		return profile.facebook.name;
	}
}
storageData(profile){
	localStorage.setItem('user', JSON.stringify(profile));
	localStorage.setItem('id_token', profile.facebook.token);
}
}
