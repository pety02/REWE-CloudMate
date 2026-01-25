import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';

/**
 *
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
  registerForm!: FormGroup;
  @Output() registered = new EventEmitter<void>();
  errorMessage: string | null = null;

  /**
   *
   * @param fb
   * @param auth
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  /**
   *
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
   *
   * @param form
   * @private
   */
  private passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmedPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  /**
   *
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
