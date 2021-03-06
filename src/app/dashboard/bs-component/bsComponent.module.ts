import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
		AlertModule,
		ButtonsModule,
		DropdownModule,
		PaginationModule,
		ProgressbarModule,
		RatingModule,
		TabsModule,
		TooltipModule,
		ModalModule,
		TypeaheadModule
	} from 'ng2-bootstrap';


import { BSComponentComponent } from './bsComponent.component';

@NgModule({
    imports: [
    	RouterModule,
    	FormsModule,
		CommonModule,
		AlertModule,
		ButtonsModule,
		DropdownModule,
		PaginationModule.forRoot(),
		ProgressbarModule.forRoot(),
		RatingModule.forRoot(),
		TabsModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		TypeaheadModule.forRoot()
	],
    declarations: [BSComponentComponent],
    exports: [BSComponentComponent]
})

export class BSComponentModule { }
