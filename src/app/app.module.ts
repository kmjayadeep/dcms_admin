import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import {AuthService} from './services/auth/auth.service'

import {DropdownModule,AlertModule} from 'ng2-bootstrap'

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
	apiKey: 'AIzaSyCvN9K2cdfUf4H8BIr8vqRhdtGV_ca2UIs',
    authDomain: 'drishti-bd782.firebaseapp.com',
    databaseURL: 'https://drishti-bd782.firebaseio.com',
    storageBucket: 'drishti-bd782.appspot.com',
    messagingSenderId: '37494669483',
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,
		SignupModule,
		DashboardModule,
		SharedModule.forRoot(),
		DropdownModule.forRoot(),
		AlertModule.forRoot(),
	    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
	],
	declarations: [AppComponent],
	providers: [{
		provide: APP_BASE_HREF,
		// useValue: '<%= APP_BASE %>'
		useValue: '/'
	},AuthService],
	bootstrap: [AppComponent]

})

export class AppModule { }
