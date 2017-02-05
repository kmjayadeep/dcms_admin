import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';
import { BlankPageModule } from './blank-page/blankPage.module';
import { TableModule } from './tables/table.module';
import { FormModule } from './forms/forms.module';
import { GridModule } from './grid/grid.module';
import { BSComponentModule } from './bs-component/bsComponent.module';
import { BSElementModule } from './bs-element/bsElement.module';

import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import { AdminsComponent } from './admins/admins.component';

import {FormsModule} from '@angular/forms'


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
    	HomeModule,
        TableModule,
        FormModule,
        GridModule,
    	BSComponentModule,
        BSElementModule,
        BlankPageModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, AdminsComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
