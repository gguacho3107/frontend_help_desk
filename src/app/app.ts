import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TicketFormComponent} from './components/ticket-form/ticket-form.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AlertComponent} from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    AlertComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-help-desk');
}
