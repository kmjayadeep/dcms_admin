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
		this.reloadEvents()
	}

	getAdmins(){
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
		this.getAdmins()
	}

}
