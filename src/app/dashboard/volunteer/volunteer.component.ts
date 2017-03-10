import { Component, OnInit } from '@angular/core';
import {VolunteerService} from '../../services/volunteer/volunteer.service'

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent{

  student:any={};
  error = null;
  public registeredEvents=[];
  
  constructor(private volunteerService:VolunteerService) { 

  // for test purposes
  this.student['email']="johndoe@gmail.com";
  this.emailEntered();

  }

  emailEntered() {
    this.registeredEvents=[];
    console.log(this.student);
    this.volunteerService.getRegisteredEvents(this.student)
    .then(result=>{
      this.error=null;
      this.registeredEvents=result;
      console.log(result);
    }).catch(error=>{
      console.log(error);
      this.registeredEvents=[];
      this.error=error.message;
    })
  }

}
