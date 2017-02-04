import { Injectable, Inject, Component } from '@angular/core';
import {AuthService} from '../services/auth/auth.service'
import {UserService} from '../services/user.service';
import {Router} from '@angular/router'
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

	public constructor(private authService:AuthService,private router:Router, private userService: UserService){
		authService.af.auth.subscribe((auth)=>{
			if(auth == null) {
         	  console.log("Not Logged in.");

	        }
	        else {

	        }
		})
	}

	login(){
		this.authService.login().then(data=>{
			this.userService.login(this.authService.idToken,this.authService.user)
			.subscribe((result)=>{
				console.log(result);
				if (result.code){
					//TODO print error to user
				}
			});
		})
	}

	logout(){
		this.authService.logout();
	}
}
