import { StorageService } from './../../services/storage.service';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/admin/auth-service';
import { take } from 'rxjs';
import { LoginResponse } from '../../shared/models/login.model';
import { SnackbarService } from '../../services/admin/snackbar-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { CryptoService } from '../../services/crypto.service';
@Component({
  selector: 'app-login-component',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  //loginForm: FormGroup;
  private authService: AuthService = inject(AuthService);
  private snackbar: SnackbarService = inject(SnackbarService);
  private cryptoService: CryptoService = inject(CryptoService);
  private storageService: StorageService = inject(StorageService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  cryptoKey!: CryptoKey;
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe({
        next: async (response: LoginResponse) => {
          if (response.status) {
            localStorage.setItem('_key', response.data.userData.encryptionKeyHint);
            localStorage.setItem('_salt', response.data.userData.salt);
            this.storageService.setItem('_t', response.data.token.accessToken);
            this.storageService.setItem('_u', JSON.stringify(response.data.userData));

            switch (response.data.userData.userType.shortCode) {
              case 'US':
                this.router.navigate(['../../']);
                break;
              default:
                this.router.navigate(['../../admin']);
            }

            // Handle successful login, e.g., redirect to dashboard
          } else {
            console.error('Login failed:', response.message);
            // Handle login failure, e.g., show error message
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          this.snackbar.showSnackbar(error.error.message, 'error');
          // Handle error, e.g., show error message
        },
      });
  }
}
