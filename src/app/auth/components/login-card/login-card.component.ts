import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

/**
 *
 */
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
    MatError,
    NgIf,
  ],
  templateUrl: 'login-card.component.html',
  styleUrls: [
    'login-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  /**
   *
   * @param fb
   * @param auth
   * @param router
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(
            '^(?=.{3,30}$)[a-zA-Z0-9]([a-zA-Z0-9_.]*)[a-zA-Z0-9]$'
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$')
        ]
      ]
    });
  }

  /**
   *
   */
  login(): void {
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      return;
    }

    const { username, password } = this.loginForm.value;

    const success = this.auth.login(username, password);

    if (!success) {
      this.errorMessage = 'Invalid username or password.';
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify({ username }));
    (document.activeElement as HTMLElement)?.blur();
    this.loginForm.reset();
    this.router.navigate(['/home']).then(r => r);
  }
}
