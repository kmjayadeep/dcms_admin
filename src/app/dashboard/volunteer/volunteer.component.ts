import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent{

  student={};

  constructor() { }

  emailEntered() {
  	console.log(this.student);
  	
  }

}
