import { Injectable,Inject } from '@angular/core';

import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';

declare var firebase : any;


@Injectable()
export class AuthService {

	firebase: any;
	user = {};
	loggedIn:boolean = false

	public constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any){
		this.firebase = firebase;
		this.af.auth.subscribe(user => {
			if(user){
				this.user = user
				this.loggedIn = true
			}else{
				this.user = {}
				this.loggedIn = false
			}
		// 	console.log(this.user)
	 //    	firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
	 //    	}).catch(function(error) {
	 //    		console.log(error);
	 //    	});
	 	});
	}
	login(){
		return this.af.auth.login({
			provider:AuthProviders.Google,
			method:AuthMethods.Popup
		})
	}

	logout(){
		return this.af.auth.logout();
	}
}
