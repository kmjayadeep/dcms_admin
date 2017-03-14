import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {EventService} from '../../services/event/event.service';
import {UserService} from '../../services/user.service';
import { DataTableResource } from 'angular-2-data-table-bootstrap4';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {

  error = null;
  message = null;
  event = null;
  registeredStudents = [];
  eventList = [];
  selectedEvent= null;
  constructor(private eventService: EventService, private _sanitizer: DomSanitizer) {
 }

  ngOnInit() {
    this.getEvents();
    this.error = 'Please wait for loading events (this message will be gone when loaded)';
  }

  getEvents(){
    this.eventList = [];
    this.error = null;
    this.message = null;
    this.event = null;
    this.eventService.getEventAndWorkShop()
    .then((events: any) => {
      this.error = null;
      console.log(events);
      this.eventList = events.map(x => {
        return {
          id: x.id,
          name: x.name,
          group: x.group
        };
      });
    })
    .catch(err => {
      console.log(err);
      this.error = 'Unable to load Event list';
    });
  }

    autocompleListFormatter = (data: any) : SafeHtml => {
    const html = `<span>${data.name}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  getRegistered(){
    this.error = 'Loading, please wait';
    this.registeredStudents = [];
    console.log(this.selectedEvent);
    this.eventService.getRegisteredCount(this.selectedEvent.id)
    .then(result => {
      console.log(result);
        this.error = null;
        this.event = result;
        if (result.students.length === 0){
          this.error = 'No student registrations yet';
        } else {
          this.registeredStudents = result.students;
        }
    }).catch(error => {
      console.log(error);
      this.error = 'Unable to get students';
    });
  }
}
