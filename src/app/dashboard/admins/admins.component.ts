import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service'

@Component({
	selector: 'app-admins',
	templateUrl: './admins.component.html',
	styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

	error = null
	message = null
	admins = []
	admin = null

	constructor(private userService:UserService) {
	}

	getAdmins(){
		this.error = null
		this.message = null
		this.admin = null
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

	reloadAdmins(){
		console.log('reloading')
		this.getAdmins()
	}

	getStatus(status){
		if(status==0)
			return 'Not Verified';
		else if(status==10)
			return 'SuperAdmin';
		else if(status==9)
			return 'Admin';
		else if(status==8)
			return 'Event Coordinator';
		else if(status==7)
			return 'Registration Desk';
	}

	changeStatus(status){
		this.admin.status = status
	}

	save(){
		this.error = null
		this.message = null
		console.log(this.admin)
		this.userService.updateAdmin(this.admin)
			.then(res=>{
				this.message = 'Saved Successfully'
				this.admin = null
				this.reloadAdmins()
			})
			.catch(err=>{
				console.log(err)
				this.error = 'Unable to save'
			})
	}

	view(adminId){
		console.log('viewing')
		this.error = null
		this.admin = null
		this.userService.getAdmin(adminId)
			.then(admin=>{
				console.log(admin)
				this.admin = admin
			})
			.catch(err=>{
				this.error = 'Unable to load Admin details'
			})
	}

	ngOnInit() {
		//this.getAdmins()
	}

}
