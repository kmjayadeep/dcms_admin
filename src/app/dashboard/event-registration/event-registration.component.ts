import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {EventService} from '../../services/event/event.service'
import {UserService} from '../../services/user.service'
import { DataTableResource } from 'angular-2-data-table-bootstrap4';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

import * as Promise from 'bluebird'

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {

  error = null;
  message = null;
  event = null;
  eventList = [];
  constructor(private eventService:EventService, private _sanitizer: DomSanitizer) {		
 }

  ngOnInit() {
    this.getEvents();
  }
	
  getEvents(){
    this.eventList = [];
		this.error = null
		this.message = null
		this.event = null
		this.eventService.getEvents()
		.then(events=>{
			console.log(events)
      this.eventList=events.map(x=>{
        return {
          id: x.id,
          name: x.name
        };
      });
		})
		.catch(err=>{
			console.log(err)
			this.error = 'Unable to load Event list'
		})
	}

    autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
