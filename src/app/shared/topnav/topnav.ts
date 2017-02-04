import { Component } from '@angular/core';
import {UserService} from '../../services/user.service'
import {AuthService} from '../../services/auth/auth.service'
import {Router} from '@angular/router'


declare var $

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {

	user = {}

	constructor(private userService:UserService,private authService:AuthService,private router:Router){
		this.user = userService.user
	}

	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}

	logout(){
		this.authService.logout()
		.then(()=>{
			this.router.navigate([''])
		})
	}
}
