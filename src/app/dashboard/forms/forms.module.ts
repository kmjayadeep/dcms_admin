import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormComponent } from './forms.component';
import {FormsModule} from '@angular/forms'

@NgModule({
    imports: [
        RouterModule,
        FormsModule
    ],
    declarations: [FormComponent],
    exports: [FormComponent]
})

export class FormModule { }
