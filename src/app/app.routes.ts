import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TicketListComponent} from './components/ticket-list/ticket-list.component';
import {TicketFormComponent} from './components/ticket-form/ticket-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'navbar',
    component: NavbarComponent,
  },
  {
    path: 'ticket-form',
    component: TicketFormComponent,
  },
  {
    path: 'ticket-list',
    component: TicketListComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
