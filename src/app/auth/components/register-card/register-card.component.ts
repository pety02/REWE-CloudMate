import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton,
    MatFormField,
    MatCard
  ],
  templateUrl: 'register-card.component.html',
  styleUrls: [
    'register-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class RegisterCardComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const { username, password, confirmedPassword } = this.registerForm.value;

    if (password !== confirmedPassword) {
      alert('Passwords do not match');
      return;
    }

    const success = this.auth.register({ username, password });

    if (!success) {
      alert('Username already exists');
      return;
    }

    alert('User registered successfully!');
    this.registerForm.reset();
  }
}
