import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ITicket} from '../models/ticket.model';

@Injectable({providedIn: 'root'})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) { }

  findAll():Observable<ITicket[]>{
    return this.http.get<ITicket[]>(this.apiUrl);
  }

  getTicket(id: number): Observable<ITicket>{
    return this.http.get<ITicket>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: ITicket):Observable<ITicket>{
    return this.http.post<ITicket>(this.apiUrl, ticket);
  }

  updateTicket(id:number , ticket:ITicket): Observable<ITicket>{
    return this.http.put<ITicket>(`${this.apiUrl}/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
