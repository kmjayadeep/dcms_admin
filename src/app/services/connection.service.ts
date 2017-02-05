import { Injectable,Inject } from '@angular/core';
import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';
import {Headers,Http} from '@angular/http';
import * as Promise from 'bluebird'

@Injectable()
export class ConnectionService {
	protected serverUrl = 'http://localhost:3000/dcms-admin';
	private firebase:any

	constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any,http:Http) {
		this.firebase = firebase
	}

	protected getHeaders(){
		if(!this.firebase.auth().currentUser){
			throw "not logged in";
		}
		return this.firebase.auth().currentUser.getToken(false)
		.then(token=>{
			return new Promise((resolve,reject)=>{
				if(!token)
					reject('no token')
				var headers = new Headers();
				headers.append('x-auth-token',token)
				resolve(headers)
			})
		})
	}

}
