import { Component, OnInit } from '@angular/core';
import { WorkshopService } from '../../services/workshop/workshop.service'
import { UserService } from '../../services/user.service'

import * as Promise from 'bluebird'


@Component({
	selector: 'app-workshop',
	templateUrl: './workshop.component.html',
	styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent {

	error = null
	message = null
	workshops = []
	workshop = null
	WorkshopAdmin = null
	category = {
		'ORIGINALS': 'Drishti Originals',
		'GAMING': 'Gaming',
		'ONLINE': 'Online',
		'GEN': 'General',
		'CIVIL': 'Civil',
		'EE': 'Electrical',
		'EC': 'Electronics',
		'ME': 'Mechanical',
		'CS': 'Computer Science',
		'ROBO': 'Robotics'
	}
	categoryArray = Object.keys(this.category).map(key => {
		return [key, this.category[key]]
	})

	allAdmins = []

	constructor(private workshopService: WorkshopService, private userService: UserService) {
		userService.getAdmins()
			.then((admins) => {
				this.allAdmins = admins
			})
	}

	getWorkshops() {
		this.error = null
		this.message = null
		this.workshop = null
		this.workshopService.getWorkshops()
			.then(workshops => {
				console.log(workshops)
				this.workshops = workshops
			})
			.catch(err => {
				console.log(err)
				this.error = 'Unable to load workshop list'
			})
	}

	reloadWorkshops() {
		console.log('reloading')
		this.getWorkshops()
		this.userService.getAdmins()
			.then((admins) => {
				this.allAdmins = admins
			})
	}

	view(workshopId) {
		this.error = null
		this.message = null
		this.workshop = null
		this.workshopService.getWorkshop(workshopId)
			.then(workshop => {
				console.log(workshop)
				workshop.group = workshop.group ? 1 : 0
				this.workshop = workshop
			})
			.catch(err => {
				this.error = 'Unable to load workshop'
			})
	}

	save() {
		console.log(this.workshop)
		this.error = null
		this.message = null
		let promise = null
		if (this.workshop.uploadImage) {
			this.message = 'Uploading Image'
			promise = new Promise((res, rej) => {
				let picId = Math.random() * 1000000
				if (this.workshop.id)
					picId = this.workshop.id
				this.workshopService.uploadPic(picId, this.workshop.uploadImage)
					.then(result => {
						console.log(result)
						this.workshop.image = result
						res(result)
					})
					.catch(err => {
						rej(err)
					})
			})
		} else {
			promise = new Promise((res, rej) => res())
		}
		promise.then((res) => {
			if (this.workshop.id)
				return this.workshopService.updateWorkshop(this.workshop)
			else
				return this.workshopService.addWorkshop(this.workshop);
		})
			.then(workshop => {
				console.log(workshop)
				this.message = 'workshop Updated Successfully'
				this.workshop = null
				this.reloadWorkshops()
			})
			.catch(err => {
				console.log(err)
				this.error = 'Unable to update workshop'
			})
	}

	addWorkshopAdmin(adminId) {
		if (!adminId)
			return
		let admin = this.workshop.allAdmins.find(admin => admin.id == adminId)
		console.log(admin)
		this.workshop.admins.push(admin)
		this.workshop.allAdmins = this.workshop.allAdmins.filter(ad => ad.id != adminId)
	}

	deleteAdmin(admin) {
		this.workshop.admins = this.workshop.admins.filter(ad => ad.id != admin.id)
		this.workshop.allAdmins.push(admin)
	}

	fileChange($workshop) {
		console.log($workshop.target.files)
		if ($workshop.target.files && $workshop.target.files[0])
			this.workshop.uploadImage = $workshop.target.files[0]
	}
}
