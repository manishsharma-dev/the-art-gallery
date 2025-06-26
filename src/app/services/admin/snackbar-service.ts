import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../shared/components/custom-snackbar/custom-snackbar.component';
@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  message = signal<string>('');
  horizontalPosition  = signal<MatSnackBarHorizontalPosition>('center');
  type = signal<'success' | 'error' | 'warning'>('success');
  verticalPosition = signal<MatSnackBarVerticalPosition>('top');
  action = signal<string>('');
  duration = signal<number>(3000);
  snackBar: MatSnackBar = inject(MatSnackBar);
  showSnackbar(message: string,
    type:'success' | 'error' | 'warning',
    action = 'Close',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    duration = 3000
    ) {
    this.message.set(message);
    this.type.set(type)
    this.action.set(action);
    this.duration.set(duration);
    this.horizontalPosition.set(horizontalPosition);
    this.verticalPosition.set(verticalPosition);
    const config: MatSnackBarConfig = {
      duration: this.duration(),
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      panelClass: ['no-padding-snackbar'],
      data: { message, type }
    }
  this.snackBar.openFromComponent(CustomSnackbarComponent, config);
  }
}
