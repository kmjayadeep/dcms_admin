import { Injectable,Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from './connection.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import  * as Promise from 'bluebird'
import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';



@Injectable()
export class UserService extends ConnectionService {

	private userApi = this.serverUrl + '/user';
	private adminApi = this.serverUrl + '/';
	private authApi = this.serverUrl + '/auth';
	public user = null

	constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any, protected http: Http) {
		super(af,firebase,http);
		if(localStorage['profile'])
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

	getAdmins(){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.adminApi,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}
	
	getAdmin(adminId){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.adminApi+'/'+adminId,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

}
