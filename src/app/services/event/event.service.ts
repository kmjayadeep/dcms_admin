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

	constructor(public af: AngularFire, @Inject(FirebaseApp) private firebaseApp: any, protected http: Http) {
		super(af,firebaseApp,http);
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

	uploadPic(eventId,file){
		let path = 'images/event/'+eventId+file.name
		let ref = this.firebaseApp.storage().ref().child(path)
		return ref
				.put(file)
				.then(res=>{
					return new Promise((resolve,reject)=>{
						ref.getDownloadURL().then(url => resolve(url))
							.catch(err=>reject(err))
					})
				})
	}
	
}
