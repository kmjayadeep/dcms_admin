import { Injectable ,Inject} from '@angular/core';
import { Headers, Http } from '@angular/http';
import {ConnectionService} from '../connection.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import  * as Promise from 'bluebird'
import {AngularFire, FirebaseApp,AuthProviders,AuthMethods} from 'angularfire2';



@Injectable()
export class WorkshopService extends ConnectionService{


	private workshopApi = this.serverUrl + '/workshop';

	constructor(public af: AngularFire, @Inject(FirebaseApp) private firebaseApp: any, protected http: Http) {
		super(af,firebaseApp,http);
	}

	getWorkshops(){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.workshopApi,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	getWorkshop(workshopId){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.get(this.workshopApi+'/'+workshopId,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	deleteWorkshop(workshopId){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.delete(this.workshopApi+'/'+workshopId,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	updateWorkshop(workshop){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.post(this.workshopApi+'/'+workshop.id,workshop,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	addWorkshop(workshop){
		return this.getHeaders()
		.then(headers=>{
			return this.http
			.put(this.workshopApi,workshop,{
				headers:headers
			})
			.map(res=>res.json())
			.toPromise()
		})
	}

	uploadPic(workshopId,file){
		let path = 'images/workshops/'+workshopId+file.name
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
