import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  
import { ReactiveFormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';        

@Component({
  selector: 'app-signup',
  standalone: true,  
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.authService.signup({ username, email, password }).subscribe({
        next: () => {
          this.router.navigate(['']); 
        },
        error: (err) => {

          this.errorMessage = 'Username And Email Exist..Please Try Different  Usename';  
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}
