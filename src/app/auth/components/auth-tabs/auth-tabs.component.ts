import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoginCardComponent } from '../login-card/login-card.component';
import { RegisterCardComponent } from '../register-card/register-card.component';
import {AuthService} from '../../../../services/auth.service';

/**
 * AuthTabsComponent
 *
 * Displays authentication tabs (Login / Register) using Angular Material tabs.
 * Also initializes default users in localStorage if none exist.
 */
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

  /** Index of the currently selected tab */
  selectedTabIndex = 0;

  /**
   * Switches the tab view back to the Login tab.
   * Typically triggered after a successful registration.
   */
  goToLogin(): void {
    this.selectedTabIndex = 0;
  }

  /**
   * @param authService Service responsible for authentication logic
   */
  constructor(private authService: AuthService) {
  }

  /**
   * Lifecycle hook that runs on component initialization.
   * Ensures users are initialized in localStorage.
   */
  ngOnInit(): void {
    this.initializeUsers();
  }

  /**
   * Initializes the users list in localStorage if it does not already exist.
   * Uses the AuthService as the source of default users.
   */
  initializeUsers(): void {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify(this.authService.getUsers()));
    }
  }
}
