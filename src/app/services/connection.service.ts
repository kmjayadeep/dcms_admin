import { Injectable,Inject } from '@angular/core';
import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';
import {Headers,Http} from '@angular/http';
import * as Promise from 'bluebird'

@Injectable()
export class ConnectionService {
	// public serverUrl = 'http://localhost:3000/dcms-admin';
	public serverUrl = 'http://server.drishticet.org/dcms-admin';
	public firebase:any

	constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any,http:Http) {
		this.firebase = firebase
	}

	public getHeaders(){
		if(!this.firebase||!this.firebase.auth().currentUser){
			return new Promise((res,rej)=>{
				rej(new Error('Unable to login'))
			})
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
