import {ChangeDetectorRef, Component, OnInit, SecurityContext} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TicketService} from '../../services/ticket.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']

})
export class TicketFormComponent{
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private alertService: AlertService
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      category: [null, Validators.required],
      priority: ['ALTA', Validators.required],
    });
  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      this.alertService.showError('Por favor, completa todos los campos requeridos')
      return;
    }
    if (this.ticketForm.value.category === 'Seleccione una categoria') {
      alert('Seleccione una categoria');
      return;
    }

    if (this.ticketForm.valid) {
      const formValues = this.ticketForm.value;

      const safeTitle = this.sanitizer.sanitize(SecurityContext.HTML, formValues.title);
      const safeDescription = this.sanitizer.sanitize(SecurityContext.HTML, formValues.description);

      const newTicket = {
        ...formValues,
        title: safeTitle,
        description: safeDescription,
        status: 'ABIERTO',
        createdAt: new Date().toISOString(),
      }

      this.ticketService.createTicket(newTicket).subscribe({
        next: (response) => {
          this.alertService.showSuccess('Ticket creado exitosamente!');
          this.ticketForm.reset({category: null, priority: 'ALTA'});
          this.router.navigate(['/ticket-form']).then();
        },
        error: (error) => {
          this.alertService.showError('Hubo un error al guardar el ticket');
          console.log(error);
        }
      })
    }
  }

}
