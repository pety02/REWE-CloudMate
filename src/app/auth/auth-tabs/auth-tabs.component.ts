import { Component } from '@angular/core';
import {LoginCardComponent} from '../login-card/login-card.component';

@Component({
  selector: 'app-auth-tabs',
  standalone: true,
  imports: [
    LoginCardComponent
  ],
  templateUrl: './auth-tabs.component.html',
  styleUrl: './auth-tabs.component.css'
})
export class AuthTabsComponent {

}
