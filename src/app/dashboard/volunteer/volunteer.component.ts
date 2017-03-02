import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '../../services/volunteer/volunteer.service'

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent{

  student={};
  error = null;

  constructor(private volunteerService:VolunteerService) { }

  emailEntered() {
  	console.log(this.student);
  	this.volunteerService.getRegisteredEvents(this.student)
  	.then(result=>{
  		this.error=null;
  		console.log(result);
  	}).catch(error=>{
  		console.log(error);
  		this.error=error.message;
  	})
  }

}
