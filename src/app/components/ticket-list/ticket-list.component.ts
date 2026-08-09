import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ITicket} from '../../models/ticket.model';
import {TicketService} from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets = signal<ITicket[]>([]);

  constructor(
    private ticketService : TicketService,
    ) { }

  ngOnInit(): void {
        this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.findAll().subscribe({
      next: (data: ITicket[]): void => {
        this.tickets.set(data)
      },
      error: (err) => {
          console.error(err);
      }
      }
    )
  }

  deleteTicket(id:number | undefined ): void {
    if(id&& confirm("Esta seguuro de eliminar ese Ticket??")){
      this.ticketService.deleteTicket(id).subscribe({
        next: (data) => {
          this.loadTickets();
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

}
