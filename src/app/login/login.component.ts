import { Injectable, Inject, Component } from '@angular/core';
import {AngularFire, FirebaseApp} from 'angularfire2';
declare var firebase : any;

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html'
})

export class LoginComponent { 
	firebase: any;
	public constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any){
		this.firebase = firebase;
		this.af.auth.subscribe(auth => {
	    	console.log(auth)
	    	firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
	    		console.log(idToken);
	    	}).catch(function(error) {
	    		console.log(error);
	    	});
	 	});
	}
	login()
	{
		this.af.auth.login();
	}

	logout()
	{
		this.af.auth.logout();
	}
}
