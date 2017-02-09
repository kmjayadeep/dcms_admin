import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service'
import * as Promise from 'bluebird'

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css']
})
export class EventsComponent{

	error = null
	message = null
	events = []
	event = null
	eventAdmin = null
	category = {
		'AR' : 'Architectural',
		'EE' : 'Electrical',
		'EC' : 'Electronics',
		'ME':'Mechanical', 
		'CS':'Computer Science',
		'ROBO':'Robotics',
		'GEN':'General',
		'ONLINE':'Online'
	}
	categoryArray = Object.keys(this.category).map(key=>{
		return [key,this.category[key]]
	})

	constructor(private eventService:EventService) {
	}

	getEvents(){
		this.error = null
		this.message = null
		this.event = null
		this.eventService.getEvents()
		.then(events=>{
			console.log(events)
			this.events = events
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to load Event list'
		})
	}

	reloadEvents(){
		console.log('reloading')
		this.getEvents()
	}

	view(eventId){
		this.error = null
		this.message = null
		this.event = null
		this.eventService.getEvent(eventId)
		.then(event=>{
			console.log(event)
			event.group = event.group?1:0
			this.event = event
		})
		.catch(err=>{
			this.error = 'Unable to load event'
		})
	}

	save(){
		console.log(this.event)
		this.error = null
		this.message = null
		let promise = null
		if(this.event.uploadImage){
			this.message = 'Uploading Image'
			promise = new Promise((res,rej)=>{
				let picId = Math.random()*1000000
				if(this.event.id)
					picId = this.event.id
				this.eventService.uploadPic(picId,this.event.uploadImage)
				.then(result=>{
					console.log(result)
					this.event.image = result
					res(result)
				})
				.catch(err=>{
					rej(err)
				})
			})
		}else{
			promise = new Promise((res,rej)=>res())
		}
		promise.then((res)=>{
			if(this.event.id)
				return 	this.eventService.updateEvent(this.event)
			else
				return this.eventService.addEvent(this.event);
		})
		.then(event=>{
			console.log(event)
			this.message = 'Event Updated Successfully'
			this.event = null
			this.reloadEvents()
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to update event'
		})
	}

	saveEventAdmins(){
		this.message = null
		this.error = null
		let admins = this.event.admins.map(ad=>ad.id)
		this.eventService.updateAdmins(this.event.id,admins)
		.then(()=>{
			this.message = 'Event coordinators updated'
			this.reloadEvents()
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to edit event coordinators'
		})
	}

	addEventAdmin(adminId){
		if(!adminId)
			return
		let admin = this.event.allAdmins.find(admin=>admin.id==adminId)
		console.log(admin)
		this.event.admins.push(admin)
		this.event.allAdmins = this.event.allAdmins.filter(ad=>ad.id!=adminId)
	}

	deleteAdmin(admin){
		this.event.admins = this.event.admins.filter(ad=>ad.id!=admin.id)
		this.event.allAdmins.push(admin)
	}

	fileChange($event){
		console.log($event.target.files)
		if($event.target.files&&$event.target.files[0])
			this.event.uploadImage = $event.target.files[0]
	}
}
