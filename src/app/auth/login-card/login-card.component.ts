import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

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
    '../../../styles/auth/shared-styles.css'
  ]
})
export class LoginCardComponent {
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: Validators.required}),
    password: new FormControl ('', {
      nonNullable: true,
      validators: Validators.required}),
  });

  login(): void {

  }
}
