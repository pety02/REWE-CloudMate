import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {LoginCardComponent} from '../login-card/login-card.component';
import {RegisterCardComponent} from '../register-card/register-card.component';

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
  templateUrl: './auth-tabs.component.html',
  styleUrl: './auth-tabs.component.css'
})
export class AuthTabsComponent {

}
