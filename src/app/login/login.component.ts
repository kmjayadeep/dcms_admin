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
		
	}

	login(provider){
		this.authService.login(provider)
		.then(data=>{
			return this.userService.login(this.authService.idToken)
		}).then(user=>{
			console.log(user)
			this.router.navigate(['dashboard/home'])
		})
		.catch(err=>{
			console.log(err)
		})
	}

	logout(){
		this.authService.logout();
	}
}
