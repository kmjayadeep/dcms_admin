import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from './connection.service';
@Injectable()
export class UserService extends ConnectionService {

	private userApi = this.serverUrl + '/user';
	private authApi = this.serverUrl + '/auth';
	constructor(protected http: Http) {
		super();
	}

	login(idToken): any {
		return this.http
			.post(this.authApi + '/login', {
				idToken: idToken,
			});
	}
}
