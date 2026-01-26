import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

/**
 * RegisterCardComponent
 *
 * Handles user registration with form validation.
 * Emits an event when registration succeeds.
 */
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
    MatCard,
    MatError,
    NgIf
  ],
  templateUrl: 'register-card.component.html',
  styleUrls: [
    'register-card.component.css',
    '../../../../styles/auth/shared-styles.css'
  ]
})
export class RegisterCardComponent implements OnInit {

  /** Reactive form for user registration */
  registerForm!: FormGroup;

  /** Event emitted after successful registration */
  @Output() registered = new EventEmitter<void>();

  /** Error message displayed to the user */
  errorMessage: string | null = null;

  /**
   * @param fb Angular FormBuilder for reactive forms
   * @param auth Authentication service
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  /**
   * Initializes the registration form with validation rules.
   */
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
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
        ],
        confirmedPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32)
          ]
        ]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  /**
   * Custom validator to ensure password and confirmation match.
   *
   * @param form Registration form group
   * @returns Validation error or null if valid
   */
  private passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmedPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  /**
   * Attempts to register a new user.
   * Displays validation or duplication errors when necessary.
   * Emits an event on successful registration.
   */
  register(): void {
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      if (this.registerForm.hasError('passwordsMismatch')) {
        this.errorMessage = 'Passwords do not match.';
      } else {
        this.errorMessage = 'Please fix the errors in the form.';
      }
      return;
    }

    const { username, password } = this.registerForm.value;

    const success = this.auth.register({ username, password });

    if (!success) {
      this.errorMessage = 'Username already exists.';
      return;
    }

    (document.activeElement as HTMLElement)?.blur();
    this.registerForm.reset();
    this.registered.emit();
  }
}
