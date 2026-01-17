import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {LoginCardComponent} from '../login-card/login-card.component';
import {RegisterCardComponent} from '../register-card/register-card.component';
import { mock_users } from '../../models/user.model';

@Component({
  selector: 'app-auth-tabs',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTabGroup,
    MatTab,
    LoginCardComponent,
    RegisterCardComponent
  ],
  templateUrl: 'auth-tabs.component.html',
  styleUrl: 'auth-tabs.component.css'
})
export class AuthTabsComponent implements OnInit {

  ngOnInit(): void {
    this.initializeUsers();
  }

  initializeUsers(): void {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify(mock_users));
    }
  }
}
