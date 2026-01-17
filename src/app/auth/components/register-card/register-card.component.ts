import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardTitle,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCard
  ],
  templateUrl: './register-card.component.html',
  styleUrls: [
    './register-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class RegisterCardComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required],
    });
  }

  registerUser(user: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.username === user.username)) {
      return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
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

    const success = this.registerUser({ username, password });

    if (!success) {
      alert('Username already exists');
      return;
    }

    alert('User registered successfully!');
    this.registerForm.reset();
  }
}
