import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-register-card',
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
    '../../../styles/auth/shared-styles.css'
  ]
})
export class RegisterCardComponent {
  registerForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    confirmedPassword: FormControl<string>;
  }> = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: Validators.required}),
    password: new FormControl ('', {
      nonNullable: true,
      validators: Validators.required}),
    confirmedPassword: new FormControl ('', {
      nonNullable: true,
      validators: Validators.required}),
  });

  register(): void {

  }
}
