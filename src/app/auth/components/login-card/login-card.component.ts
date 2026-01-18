import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
  ],
  templateUrl: 'login-card.component.html',
  styleUrls: [
    'login-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const { username, password } = this.loginForm.value;

    const success = this.auth.login(username, password);

    if (!success) {
      alert('Bad credentials');
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify({ username }));
    (document.activeElement as HTMLElement)?.blur();
    this.loginForm.reset();
    this.router.navigate(["/home"]);
  }
}
