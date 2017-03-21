import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class PinsService {

  constructor(private http: Http) { }

getPins(){
	return this.http.get('home').map(res => res.json())
}
getProfile(){
	return this.http.get('profile').map(res => res.json())
}
newPin(newPin){
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return this.http.post('add', newPin, {headers: headers}).map(res => res.json());
}
deletePin(pin){
	const id = pin._id;
	return this.http.delete('delete/'+id).map(res => res.json());
}
validate(newPin){
	if(newPin.title == "" || newPin.url == ""){
		return false;
	}
	else {
	return true
	}
}
alreadyVoted(pin, user){
return pin.voters.some(voter => {
		return voter == user;
	});
}
addVote(pin, userID){
const user = {
 	id: userID
 	}
 let headers = new Headers();
 headers.append('Content-Type', 'application/json');
 return this.http.post('vote/'+pin._id, user, {headers: headers}).map(res => res.json());
}

}
