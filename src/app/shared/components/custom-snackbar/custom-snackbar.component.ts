import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar.component',
  imports: [CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomSnackbarComponent {
  public data: { message: string; type: 'success' | 'error' | 'warning' } = inject(MAT_SNACK_BAR_DATA);
  private snackBarRef: MatSnackBarRef<CustomSnackbarComponent> = inject(MatSnackBarRef<CustomSnackbarComponent>);

  close(){
    this.snackBarRef.dismiss();
  }
}
