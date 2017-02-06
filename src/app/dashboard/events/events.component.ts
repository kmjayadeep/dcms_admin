import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service'


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
		this.eventService.updateEvent(this.event)
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

	changeGroup(group){
		this.event.group = group
	}

}
