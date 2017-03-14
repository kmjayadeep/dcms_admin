import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event/event.service';
import {UserService} from '../../services/user.service';
import { DataTableResource } from 'angular-2-data-table-bootstrap4';

import * as Promise from 'bluebird';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent{
    error = null;
    message = null;
    events = [];
    event = null;
    eventAdmin = null;
    category = {
        'ORIGINALS': 'Drishti Originals',
        'COMECON': 'Comecon',
        'GAMING': 'Gaming',
        'ONLINE': 'Online',
        'GEN': 'General',
        'CIVIL' : 'Civil',
        'AR' : 'Architecture',
        'EE' : 'Electrical',
        'EC' : 'Electronics',
        'ME': 'Mechanical',
        'CS': 'Computer Science',
        'ROBO': 'Robotics'
    };
    categoryArray = Object.keys(this.category).map(key => {
        return [key, this.category[key]];
    });

    allAdmins = [];
    itemResource: any = [];

    constructor(private eventService: EventService, private userService: UserService) {
        userService.getAdmins()
        .then((admins) => {
            this.allAdmins = admins;
        });
    }

    getEvents(query?){
        this.error = null;
        this.message = null;
        this.event = null;
        this.eventService.getRegisteredCountAll()
        .then(events => {
            console.log(events);
            this.itemResource = new DataTableResource(events);
            if (!query){
                this.events = events;
            } else {
                this.itemResource.query(query)
                .then(items => {
                    this.events = items;
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.error = 'Unable to load Event list';
        });
    }

    reloadEvents(query){
        console.log('reloading');
        console.log(query);
        if (query && this.events.length !== 0){
            return this.itemResource.query(query)
            .then(items => {
                this.events = items;
            });
        }
        this.getEvents(query);
        this.userService.getAdmins()
        .then((admins) => {
            this.allAdmins = admins;
        });
    }

    view(eventId){
        this.error = null;
        this.message = null;
        this.event = null;
        this.eventService.getEvent(eventId)
        .then(event => {
            console.log(event);
            event.group = event.group ? 1 : 0;
            this.event = event;
        })
        .catch(err => {
            this.error = 'Unable to load event';
        });
    }

    save(){
        console.log(this.event);
        this.error = null;
        this.message = null;
        let promise = null;
        if (this.event.uploadImage){
            this.message = 'Uploading Image';
            promise = new Promise((res, rej) => {
                let picId = Math.random() * 1000000;
                if (this.event.id)
                    picId = this.event.id;
                this.eventService.uploadPic(picId, this.event.uploadImage)
                .then(result => {
                    console.log(result);
                    this.event.image = result;
                    res(result);
                })
                .catch(err => {
                    rej(err);
                });
            });
        }else{
            promise = new Promise((res, rej) => res());
        }
        promise.then((res) => {
            if (this.event.id)
                return 	this.eventService.updateEvent(this.event);
            else
                return this.eventService.addEvent(this.event);
        })
        .then(event => {
            console.log(event);
            this.message = 'Event Updated Successfully';
            this.event = null;
            this.getEvents();
        })
        .catch(err => {
            console.log(err);
            this.error = 'Unable to update event';
        });
    }

    addEventAdmin(adminId){
        if (!adminId)
            return;
        const admin = this.event.allAdmins.find(admin => admin.id === adminId);
        console.log(admin);
        this.event.admins.push(admin);
        this.event.allAdmins = this.event.allAdmins.filter(ad => ad.id !== adminId);
    }

    deleteAdmin(admin){
        this.event.admins = this.event.admins.filter(ad => ad.id !== admin.id);
        this.event.allAdmins.push(admin);
    }

    fileChange($event){
        console.log($event.target.files);
        if ($event.target.files && $event.target.files[0])
            this.event.uploadImage = $event.target.files[0];
    }
}
