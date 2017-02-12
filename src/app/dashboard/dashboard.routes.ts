import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { TableRoutes } from './tables/index';
import { FormRoutes } from './forms/index';
import { GridRoutes } from './grid/index';
import { BSComponentRoutes } from './bs-component/index';
import { BSElementRoutes } from './bs-element/index';
import { AdminsRoutes} from './admins/index'
import { EventsRoutes} from './events/index'
import { StudentRoutes} from './students/student.routes'
import { WorkshopRoutes} from './workshop/workshop.routes'

import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
    ...HomeRoutes,
    ...AdminsRoutes,
    ...EventsRoutes,
    ...StudentRoutes,
    ...WorkshopRoutes,
    ...BSComponentRoutes,
    ...TableRoutes,
    ...BlankPageRoutes,
    ...FormRoutes,
    ...GridRoutes,
    ...BSElementRoutes
    ]
}
];
