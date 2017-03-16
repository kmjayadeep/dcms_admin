import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {EventService} from '../../services/event/event.service';
import {UserService} from '../../services/user.service';
import { DataTableResource } from 'angular-2-data-table-bootstrap4';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  position = 0;
  points = "0";
  identifier = "";
  
  error = null;
  message = null;
  results = null;
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
    this.results = null;
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

  getResult(){
    this.error = "please wait";
    this.eventService.getResult(this.selectedEvent.id)
    .then(result => {
      console.log(result);
        this.error = null;
        this.results = result;
    }).catch(error => {
      console.log(error);
      this.error = 'Unable to get students';
    });
  }

  putResult(){
    if (this.position==0){
      this.error = "please fill all values";
      return;
    }
    
    if (this.points=''){
      this.error = "please fill all values";
      return;
    }
    
    if (this.identifier=''){
      this.error = "please fill all values";
      return;
    }

    this.error = "please wait";
    this.eventService.putResult(this.selectedEvent.id, this.position, this.points, this.identifier)
    .then(result=>{
      this.error="done";
      this.getResult();
    })

  }

}
