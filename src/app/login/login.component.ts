import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, 
  imports: [ReactiveFormsModule, CommonModule,RouterLink] // Include necessary modules directly
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with:', { email, password });

      this.authService.login({ email, password }).subscribe(
        (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']); 
        },
        (err) => {
          console.error('Login failed:', err);
          this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
