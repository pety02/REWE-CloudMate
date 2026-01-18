import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoginCardComponent } from '../login-card/login-card.component';
import { RegisterCardComponent } from '../register-card/register-card.component';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-auth-tabs',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabGroup,
    MatTab,
    LoginCardComponent,
    RegisterCardComponent,
  ],
  templateUrl: 'auth-tabs.component.html',
  styleUrls: ['auth-tabs.component.css']
})
export class AuthTabsComponent implements OnInit {
  selectedTabIndex = 0;

  goToLogin(): void {
    this.selectedTabIndex = 0;
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initializeUsers();
  }

  initializeUsers(): void {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify(this.authService.getUsers()));
    }
  }
}
