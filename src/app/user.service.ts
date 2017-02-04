import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from './connection.service';
@Injectable()
export class UserService extends ConnectionService{

	private userApi = this.serverUrl + '/user';
	constructor(protected http: Http) {
		super();
	}

	login(idToken): any {
		console.log(idToken);
		this.http
		.post(this.userApi + '/login', {idToken:idToken});
	}
}
