import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private ticketService = inject(TicketService);

  // 1. SIGNAL PRIMARIO: Guarda la lista real de la base de datos
  tickets = signal<any[]>([]);

  // 2. SIGNALS COMPUTADOS: Se recalculan mágicamente solos cada vez que 'tickets' cambia
  kpis = computed(() => {
    const list = this.tickets();
    return {
      total: list.length,
      open: list.filter(t => t.status === 'ABIERTO').length,
      urgent: list.filter(t => t.priority === 'ALTA').length,
      resolved: list.filter(t => t.status === 'RESUELTO' || t.status === 'CANCELADO').length
    };
  });

  categoryStats = computed(() => {
    const list = this.tickets();
    const total = list.length || 1; // Evita división por cero

    const hw = list.filter(t => t.category === 'HARDWARE').length;
    const sw = list.filter(t => t.category === 'SOFTWARE').length;
    const net = list.filter(t => t.category === 'RED').length;

    return [
      { name: 'Hardware', count: hw, percentage: Math.round((hw / total) * 100) },
      { name: 'Software', count: sw, percentage: Math.round((sw / total) * 100) },
      { name: 'Red', count: net, percentage: Math.round((net / total) * 100) }
    ];
  });

  recentTickets = computed(() => {
    return [...this.tickets()].slice(-5).reverse();
  });

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.ticketService.findAll().subscribe({
      next: (data: any[]) => {
        // ACTUALIZACIÓN CORRECTA: Usamos .set() para notificar a Angular
        this.tickets.set(data);
      },
      error: (error) => {
        console.error('Error al cargar datos del dashboard:', error);
      }
    });
  }
}
