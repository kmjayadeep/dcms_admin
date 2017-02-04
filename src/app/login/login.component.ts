import { Injectable, Inject, Component } from '@angular/core';
import {AuthService} from '../services/auth/auth.service'
import {Router} from '@angular/router'

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html'
})

export class LoginComponent { 


	public constructor(private authService:AuthService,private router:Router){
		authService.af.auth.subscribe((auth)=>{
			if(auth == null) {
         	  console.log("Not Logged in.");
	        }
	        else {
 	          console.log("Successfully Logged in.");
 	          console.log(auth)
			  this.router.navigate(['dashboard/home'])
	        }
		})
	}

	login(){
		this.authService.login().then(data=>{
			console.log(data)
			this.router.navigate(['dashboard/home'])
		})
	}
}
