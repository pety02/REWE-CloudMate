import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatButton,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatCard,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './login-card.component.html',
  styleUrls: [
    './login-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => (u.username === user.username  && u.password === user.password))) {
      return true;
    }

    return false;
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const { username, password } = this.loginForm.value;

    const success = this.loginUser({ username, password });

    if (!success) {
      alert('Bad credentials');
      return;
    }

    alert('User logged in successfully!');
    this.loginForm.reset();
  }
}
