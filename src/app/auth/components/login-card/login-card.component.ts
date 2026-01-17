import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
  ],
  templateUrl: './login-card.component.html',
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

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

    alert('User logged in successfully!');
    this.loginForm.reset();
  }
}
