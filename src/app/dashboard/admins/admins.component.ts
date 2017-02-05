import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service'

@Component({
	selector: 'app-admins',
	templateUrl: './admins.component.html',
	styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

	error = ''
	message = ''
	admins = []

	constructor(private userService:UserService) {
	}

	getAdmins(){
		this.error = ''
		this.message = ''
		this.userService.getAdmins()
		.then(admins=>{
			console.log(admins)
			this.admins = admins
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to load Admins list'
		})
	}


	ngOnInit() {
		this.getAdmins()
	}

}
