import { Injectable ,Inject} from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from '../connection.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import  * as Promise from 'bluebird'
import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';



@Injectable()
export class EventService extends ConnectionService{


	private eventApi = this.serverUrl + '/event';

	constructor(public af: AngularFire, @Inject(FirebaseApp) firebase: any, protected http: Http) {
		super(af,firebase,http);
	}

	getEvents(){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.eventApi,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	getEvent(eventId){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.eventApi+'/'+eventId,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	deleteEvent(eventId){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.delete(this.eventApi+'/'+eventId,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	updateEvent(event){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.post(this.eventApi+'/'+event.id,event,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	addEvent(event){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.put(this.eventApi,event,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	updateAdmins(eventId,admins){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.put(this.eventApi+'/admin/'+eventId,admins,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	
}
