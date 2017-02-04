import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from './connection.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import  * as Promise from 'bluebird'


@Injectable()
export class UserService extends ConnectionService {

	private userApi = this.serverUrl + '/user';
	private authApi = this.serverUrl + '/auth';
	public user = null

	constructor(protected http: Http) {
		super();
		this.user = JSON.parse(localStorage['profile'])
	}

	login(idToken): any {
		return this.http
			.post(this.authApi + '/login', {
				idToken: idToken,
			})
			.map(res=>res.json())
			.toPromise()
			.then(user=>{
				localStorage['profile'] = JSON.stringify(user)
				this.user = user
				return new Promise((resolve,reject)=>{
					resolve(user)
				})
			})
	}
}
