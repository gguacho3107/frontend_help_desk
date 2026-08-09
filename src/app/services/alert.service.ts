import { Injectable, signal } from '@angular/core';
import { AlertState } from '../models/alert-state.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertState = signal<AlertState>({ message: '', type: '' });

  showSuccess(message: string) {
    this.showAlert(message, 'success');
  }

  showError(message: string) {
    this.showAlert(message, 'error');
  }

  private showAlert(message: string, type: 'success' | 'error') {
    this.alertState.set({ message, type });

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    this.alertState.set({ message: '', type: '' });
  }
}
